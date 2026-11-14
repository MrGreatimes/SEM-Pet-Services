"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLang } from "@/components/LangRoot";

export type ViewerPhoto = { image: string; fullImage?: string; alt: string };

type PhotoViewerProps = {
  image: string;
  // Optional separate file for the full-screen view (e.g. a copy with a watermark trimmed off).
  fullImage?: string;
  alt: string;
  imgClassName?: string;
  // Thumbnail `sizes`; defaults to the offer card thumbnail widths.
  sizes?: string;
  // Extra classes for the thumbnail button, e.g. an ::after layer that widens its tap area.
  buttonClassName?: string;
  // Several photos to swipe through in the viewer (the My Mission stack). `index` is this
  // thumbnail's photo; `onClose` gets the photo showing when the viewer closes.
  gallery?: { photos: ViewerPhoto[]; index: number; onClose?: (index: number) => void };
};

const MAX_SCALE = 4;
const TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;
const MOVE_SLOP = 6; // px a pointer can drift and still count as a tap/click
const SWITCH_MS = 200; // the photo sliding off screen when swiping to the next one
const HI_RES_SIZES = "400vw"; // asks for the largest copy (3840px wide, or the original if smaller)

// Wheel/trackpad pinch has no "release" in Chrome/Edge/Firefox. The cursor doesn't move
// during a pinch, so a zoom-out past 100% springs back on the first cursor movement
// (more than REBOUND_MOVE_PX) or click after it, with this long-pause fallback in case
// the visitor just lets go and leaves the cursor alone.
const WHEEL_REBOUND_MS = 3000;
const REBOUND_MOVE_PX = 3;

type View = { s: number; x: number; y: number };
const RESET: View = { s: 1, x: 0, y: 0 };

// Zooming out past 100% gives way with resistance (the photo shrinks at under half the
// pinch's rate, never below 55%) and springs back to 100% on release.
const rubberBand = (raw: number) => 1 - (1 - Math.max(raw, 0)) * 0.45;

// Keeps events inside the viewer from reaching components around the thumbnail (React
// events bubble through the component tree even out of a portal). Without this, touching
// the enlarged My Mission photo also dragged the photo stack behind it.
const stop = (e: React.SyntheticEvent) => e.stopPropagation();

// Thumbnail (offer cards, review cards, My Mission photos) that opens the full, uncropped photo in a full-screen overlay.
// Phones: pinch to zoom, drag to pan, double-tap to toggle zoom. Desktop: click to
// toggle zoom, scroll wheel or trackpad pinch to zoom, drag to pan. Pinching or
// scrolling out past 100% rubber-bands and rebounds. With a `gallery`, swiping (or
// dragging) sideways at 100% goes to the next/previous photo; arrow keys and, on
// devices with a mouse, arrow buttons do too. Tapping outside the photo, the X button or
// Esc closes it. Uses a native <dialog> (top layer, focus trapping and focus return),
// rendered in document.body so nothing around the thumbnail (like an inert stack card)
// can affect it.
export default function PhotoViewer({
  image,
  fullImage,
  alt,
  imgClassName,
  sizes = "(max-width: 860px) 100px, 300px",
  buttonClassName,
  gallery,
}: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const es = useLang() === "es";
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>(RESET);
  const [gesturing, setGesturing] = useState(false);
  const [fit, setFit] = useState<{ w: number; h: number } | null>(null);
  // Gallery: which photo is showing, and how far it's being swiped sideways (px).
  const [idx, setIdx] = useState(0);
  const [swipe, setSwipe] = useState(0);
  // Once zoomed past 1.5x, load a bigger copy (up to the original) so the photo stays
  // sharp; the normal one goes soft past about 2x on phones. Kept until the photo changes.
  // It loads in a hidden copy first and is swapped in once ready, so the photo never blanks.
  const [hiRes, setHiRes] = useState<"off" | "loading" | "ready">("off");
  if (view.s > 1.5 && hiRes === "off") setHiRes("loading");

  const photos = gallery?.photos ?? [{ image, fullImage, alt }];
  const n = photos.length;
  const current = photos[Math.min(idx, n - 1)];
  const src = current.fullImage ?? current.image;

  const viewRef = useRef(view);
  viewRef.current = view;
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    startX: number;
    startY: number;
    moved: boolean;
    // What a one-finger drag does: pan a zoomed photo, swipe to another photo, or (after
    // a pinch) nothing new.
    mode: "none" | "pan" | "swipe" | "pinch";
    backdrop: boolean; // started on the dark area around the photo
    pinchDist: number;
    pinchScale: number;
    lastX: number;
    lastY: number;
    lastT: number;
    vx: number; // px/ms, for flicks
  } | null>(null);
  const lastTap = useRef(0);
  const switching = useRef(false);
  // Wheel zoom-out below 100%: the unresisted scale, and the timer that springs it back.
  const wheelRaw = useRef(1);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    return () => clearTimeout(switchTimer.current);
  }, []);

  const openViewer = () => {
    setView(RESET);
    setSwipe(0);
    setIdx(gallery?.index ?? 0);
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const closeViewer = () => dialogRef.current?.close();

  // Lock page scrolling while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, [open]);

  // Size the photo as large as fits on screen (16px margin), keeping its shape. Done in
  // JS because CSS auto sizing stops at the downloaded file's own size, which left
  // photos small on phones.
  const fitToScreen = useCallback(() => {
    const img = imgRef.current;
    if (!img?.naturalWidth) return;
    const k = Math.min((window.innerWidth - 32) / img.naturalWidth, (window.innerHeight - 32) / img.naturalHeight);
    setFit({ w: Math.round(img.naturalWidth * k), h: Math.round(img.naturalHeight * k) });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      fitToScreen();
      setView(RESET);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, fitToScreen]);

  // Keep the photo covering the screen (or centered, if it's smaller than the screen)
  // so panning can't drag it off into empty space.
  const clamp = useCallback((v: View): View => {
    const img = imgRef.current;
    if (!img) return v;
    const s = Math.min(MAX_SCALE, Math.max(1, v.s));
    const w = img.offsetWidth * s;
    const h = img.offsetHeight * s;
    const maxX = Math.max(0, (w - window.innerWidth) / 2);
    const maxY = Math.max(0, (h - window.innerHeight) / 2);
    return { s, x: Math.min(maxX, Math.max(-maxX, v.x)), y: Math.min(maxY, Math.max(-maxY, v.y)) };
  }, []);

  // Zoom to scale `next`, keeping the screen point (px, py) fixed under the finger/cursor.
  // Works from the photo's untransformed layout box, so it is right even mid-swipe.
  const zoomAt = useCallback(
    (v: View, next: number, px: number, py: number): View => {
      const img = imgRef.current;
      if (!img) return v;
      const box = (img.parentElement ?? img).getBoundingClientRect();
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height / 2;
      const s = Math.min(MAX_SCALE, Math.max(1, next));
      const k = s / v.s;
      return clamp({ s, x: px - cx - (px - cx - v.x) * k, y: py - cy - (py - cy - v.y) * k });
    },
    [clamp],
  );

  const toggleZoom = (px: number, py: number) => {
    const v = viewRef.current;
    setView(v.s > 1 ? RESET : zoomAt(v, TAP_ZOOM, px, py));
  };

  // Gallery: slide the photo off screen, then show the next (dir 1) or previous (-1) one.
  const go = (dir: 1 | -1) => {
    if (n < 2 || switching.current) return;
    switching.current = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setGesturing(false);
    setView(RESET);
    setSwipe(reduced ? 0 : -dir * window.innerWidth);
    clearTimeout(switchTimer.current);
    switchTimer.current = setTimeout(
      () => {
        setIdx((i) => (i + dir + n) % n);
        setHiRes("off");
        setLoaded(false);
        setFit(null);
        setView(RESET);
        setSwipe(0);
        lastTap.current = 0;
        switching.current = false;
      },
      reduced ? 0 : SWITCH_MS,
    );
  };

  // Gestures are handled on the whole screen (not only the photo), so a pinch or swipe
  // that starts beside the photo works too and never zooms the page behind.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest("button")) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setGesturing(true);
    const pts = [...pointers.current.values()];
    if (pts.length === 1) {
      gesture.current = {
        startX: e.clientX,
        startY: e.clientY,
        moved: false,
        mode: "none",
        backdrop: e.target === e.currentTarget,
        pinchDist: 0,
        pinchScale: 1,
        lastX: e.clientX,
        lastY: e.clientY,
        lastT: e.timeStamp,
        vx: 0,
      };
    } else if (pts.length === 2 && gesture.current) {
      const g = gesture.current;
      g.moved = true;
      g.mode = "pinch";
      setSwipe(0); // a swipe that turns into a pinch: put the photo back in the middle
      g.pinchDist = Math.max(1, Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y));
      // Starting from a rubber-banded zoom-out, continue from 100% (the band is visual only).
      g.pinchScale = Math.max(1, viewRef.current.s);
      g.lastX = (pts[0].x + pts[1].x) / 2;
      g.lastY = (pts[0].y + pts[1].y) / 2;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const g = gesture.current;
    if (!g || !pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    const v = viewRef.current;

    if (pts.length >= 2) {
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const mx = (pts[0].x + pts[1].x) / 2;
      const my = (pts[0].y + pts[1].y) / 2;
      const raw = (g.pinchScale * dist) / g.pinchDist;
      if (raw < 1) {
        // Pinching out past 100%: shrink with resistance, centered; rebounds on release.
        setView({ s: rubberBand(raw), x: 0, y: 0 });
      } else {
        // Coming back from a zoom-out, zoom from 100% rather than the shrunken size.
        const base = v.s < 1 ? RESET : v;
        const zoomed = zoomAt(base, raw, mx, my);
        setView(clamp({ ...zoomed, x: zoomed.x + mx - g.lastX, y: zoomed.y + my - g.lastY }));
      }
      g.lastX = mx;
      g.lastY = my;
      return;
    }

    const dx = e.clientX - g.startX;
    const dy = e.clientY - g.startY;
    if (!g.moved && Math.hypot(dx, dy) > MOVE_SLOP) {
      g.moved = true;
      g.mode = v.s > 1 ? "pan" : n > 1 && Math.abs(dx) > Math.abs(dy) ? "swipe" : "none";
    }
    if (g.mode === "pan" || (g.mode === "pinch" && v.s > 1)) {
      setView(clamp({ ...v, x: v.x + e.clientX - g.lastX, y: v.y + e.clientY - g.lastY }));
    } else if (g.mode === "swipe") {
      setSwipe(dx);
      const dt = e.timeStamp - g.lastT;
      if (dt > 0) g.vx = (e.clientX - g.lastX) / dt;
    }
    g.lastX = e.clientX;
    g.lastY = e.clientY;
    g.lastT = e.timeStamp;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.delete(e.pointerId)) return;
    const g = gesture.current;
    if (pointers.current.size > 0) {
      // One finger lifted mid-pinch: keep panning with the other one.
      const [p] = [...pointers.current.values()];
      if (g) {
        g.lastX = p.x;
        g.lastY = p.y;
      }
      return;
    }
    gesture.current = null;
    setGesturing(false);
    // Spring back from a zoom-out past 100% (animates, since gesturing is now off).
    if (viewRef.current.s < 1) setView(RESET);
    if (!g || e.type === "pointercancel") {
      setSwipe(0);
      return;
    }

    if (g.mode === "swipe") {
      // Far enough, or a quick flick, goes to the next/previous photo; otherwise it
      // slides back.
      const dx = e.clientX - g.startX;
      const far = Math.abs(dx) > Math.min(90, window.innerWidth * 0.2);
      const flick = Math.abs(g.vx) > 0.4 && Math.abs(dx) > 25 && Math.sign(g.vx) === Math.sign(dx);
      if (far || flick) go(dx < 0 ? 1 : -1);
      else setSwipe(0);
      return;
    }
    if (g.moved) return;

    if (g.backdrop) {
      closeViewer();
    } else if (e.pointerType === "mouse") {
      toggleZoom(e.clientX, e.clientY);
    } else {
      const now = Date.now();
      if (now - lastTap.current < DOUBLE_TAP_MS) {
        lastTap.current = 0;
        toggleZoom(e.clientX, e.clientY);
      } else {
        lastTap.current = now;
      }
    }
  };

  // Scroll wheel and trackpad pinch (which Chrome/Edge/Firefox report as ctrl+wheel).
  // Attached as native non-passive listeners so preventDefault stops a trackpad pinch
  // from zooming the whole page instead of the photo; pinch deltas are small, hence the
  // bigger rate. Those browsers never say when fingers leave the trackpad, so a zoom-out
  // past 100% springs back on the next cursor movement or click (see WHEEL_REBOUND_MS).
  // Safari on a Mac reports trackpad pinches as gesture events with a real end, so
  // there it waits for the fingers to lift.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    let gestureActive = false;
    let gestureStart = 1;
    // Cursor position at the last wheel event while zoomed out past 100% (null otherwise).
    let heldAt: { x: number; y: number } | null = null;

    const rebound = () => {
      clearTimeout(wheelTimer.current);
      heldAt = null;
      wheelRaw.current = 1;
      setView(RESET);
    };

    // Apply an unresisted scale `raw`; below 100% it rubber-bands (and, unless a
    // Safari gesture is still in progress, schedules the spring-back).
    const applyRaw = (raw: number, px: number, py: number) => {
      const v = viewRef.current;
      clearTimeout(wheelTimer.current);
      if (raw < 1) {
        wheelRaw.current = raw;
        setView({ s: rubberBand(raw), x: 0, y: 0 });
        if (!gestureActive) {
          heldAt = { x: px, y: py };
          wheelTimer.current = setTimeout(rebound, WHEEL_REBOUND_MS);
        }
      } else {
        heldAt = null;
        wheelRaw.current = 1;
        setView(zoomAt(v.s < 1 ? RESET : v, raw, px, py));
      }
    };

    // The fingers have left the trackpad once the cursor moves or a button is pressed.
    const onPointerMove = (e: PointerEvent) => {
      if (heldAt && e.pointerType === "mouse" && Math.hypot(e.clientX - heldAt.x, e.clientY - heldAt.y) > REBOUND_MOVE_PX) rebound();
    };
    // A click while zoomed out only springs the photo back (it doesn't also zoom in or
    // close the viewer): stopping it here keeps it from reaching the photo's handlers.
    const onPointerDown = (e: PointerEvent) => {
      if (!heldAt) return;
      e.stopPropagation();
      rebound();
    };
    const currentRaw = () => (viewRef.current.s < 1 ? wheelRaw.current : viewRef.current.s);

    const onWheel = (e: WheelEvent) => {
      if (!imgRef.current) return;
      e.preventDefault();
      if (gestureActive && e.ctrlKey) return; // Safari: the gesture events handle the pinch
      applyRaw(currentRaw() * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.002)), e.clientX, e.clientY);
    };

    // Safari-only (non-standard) trackpad gesture events; `scale` is relative to the start.
    type GestureEvent = UIEvent & { scale: number; clientX: number; clientY: number };
    const onGestureStart = (e: Event) => {
      if (!imgRef.current) return;
      e.preventDefault();
      gestureActive = true;
      gestureStart = currentRaw();
      clearTimeout(wheelTimer.current);
    };
    const onGestureChange = (e: Event) => {
      if (!gestureActive) return;
      e.preventDefault();
      const g = e as GestureEvent;
      applyRaw(gestureStart * g.scale, g.clientX, g.clientY);
    };
    const onGestureEnd = (e: Event) => {
      if (!gestureActive) return;
      e.preventDefault();
      gestureActive = false;
      if (viewRef.current.s < 1) rebound();
    };

    dialog.addEventListener("wheel", onWheel, { passive: false });
    dialog.addEventListener("pointermove", onPointerMove);
    dialog.addEventListener("pointerdown", onPointerDown, true);
    dialog.addEventListener("gesturestart", onGestureStart);
    dialog.addEventListener("gesturechange", onGestureChange);
    dialog.addEventListener("gestureend", onGestureEnd);
    return () => {
      dialog.removeEventListener("wheel", onWheel);
      dialog.removeEventListener("pointermove", onPointerMove);
      dialog.removeEventListener("pointerdown", onPointerDown, true);
      dialog.removeEventListener("gesturestart", onGestureStart);
      dialog.removeEventListener("gesturechange", onGestureChange);
      dialog.removeEventListener("gestureend", onGestureEnd);
      clearTimeout(wheelTimer.current);
    };
  }, [zoomAt, mounted]);

  const roundBtn =
    "absolute flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#2B2E33] shadow-site hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
  // Same props as the main photo, so the browser picks (and caches) the same file.
  const fullProps = { width: 1600, height: 1600, sizes: "150vw", quality: 85 } as const;

  const dialog = (
    <dialog
      ref={dialogRef}
      aria-label={current.alt}
      onClose={() => {
        clearTimeout(switchTimer.current);
        switching.current = false;
        setOpen(false);
        setHiRes("off");
        setLoaded(false);
        setFit(null);
        setView(RESET);
        setSwipe(0);
        pointers.current.clear();
        gesture.current = null;
        gallery?.onClose?.(idx);
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
      onPointerDown={stop}
      onPointerMove={stop}
      onPointerUp={stop}
      onPointerCancel={stop}
      onClick={stop}
      onWheel={stop}
      onDragStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-[#2B2E33]/90"
    >
      <div
        className="flex h-full w-full touch-none select-none items-center justify-center"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {open && (
          <Image
            key={src}
            ref={imgRef}
            src={src}
            alt={current.alt}
            {...fullProps}
            sizes={hiRes === "ready" ? HI_RES_SIZES : fullProps.sizes}
            draggable={false}
            onLoad={() => {
              fitToScreen();
              setLoaded(true);
            }}
            style={{
              width: fit ? fit.w : "auto",
              height: fit ? fit.h : "auto",
              transform: `translate(${view.x + swipe}px, ${view.y}px) scale(${view.s})`,
              transition: gesturing ? "opacity 200ms" : `transform ${SWITCH_MS}ms ease-out, opacity 200ms`,
            }}
            className={`max-w-none touch-none select-none rounded-site shadow-site ${
              view.s > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            } ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {open && hiRes === "loading" && (
          <Image
            key={`hi-${src}`}
            src={src}
            alt=""
            aria-hidden="true"
            loading="eager"
            {...fullProps}
            sizes={HI_RES_SIZES}
            onLoad={() => setHiRes((h) => (h === "loading" ? "ready" : h))}
            className="pointer-events-none absolute h-px w-px opacity-0"
          />
        )}
        {/* Load the photos on either side ahead of time, so a swipe shows them at once. */}
        {open &&
          n > 1 &&
          [(idx + 1) % n, (idx - 1 + n) % n].map((i) => (
            <Image
              key={`pre-${i}`}
              src={photos[i].fullImage ?? photos[i].image}
              alt=""
              aria-hidden="true"
              loading="eager"
              {...fullProps}
              className="pointer-events-none absolute h-px w-px opacity-0"
            />
          ))}

        {n > 1 && (
          <>
            <p aria-live="polite" className="pointer-events-none absolute left-4 top-6 rounded-full bg-black/45 px-3 py-1 text-[0.85rem] font-semibold text-white">
              {idx + 1} / {n}
            </p>
            {/* Arrow buttons only where there's a mouse; on phones, swipe. */}
            <button type="button" onClick={() => go(-1)} aria-label={es ? "Foto anterior" : "Previous photo"} className={`${roundBtn} left-4 top-1/2 hidden -translate-y-1/2 [@media(hover:hover)]:flex`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5l-7 7 7 7" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label={es ? "Foto siguiente" : "Next photo"} className={`${roundBtn} right-4 top-1/2 hidden -translate-y-1/2 [@media(hover:hover)]:flex`}>
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
        <button type="button" onClick={closeViewer} aria-label={es ? "Cerrar foto" : "Close photo"} className={`${roundBtn} right-4 top-4`}>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </dialog>
  );

  return (
    <>
      <button
        type="button"
        onClick={openViewer}
        aria-label={`${es ? "Ver foto completa" : "View full photo"}: ${alt}`}
        className={`group absolute inset-0 rounded-[inherit] cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary ${buttonClassName ?? ""}`}
      >
        {/* The photo is clipped here rather than by the parent, so a widened tap area
            (buttonClassName) can reach outside the photo's box. */}
        <span className="absolute inset-0 overflow-hidden rounded-[inherit]">
          {/* The hover zoom lives on this wrapper, not the image, so it can't override a
              crop zoom (scale-[...]) passed in imgClassName. */}
          <span className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]">
            <Image src={image} alt={alt} fill sizes={sizes} className={`object-cover ${imgClassName ?? ""}`} />
          </span>
        </span>
      </button>

      {mounted && createPortal(dialog, document.body)}
    </>
  );
}
