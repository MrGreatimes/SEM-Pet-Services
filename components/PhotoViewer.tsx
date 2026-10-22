"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

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
};

const MAX_SCALE = 4;
const TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;
const MOVE_SLOP = 6; // px a pointer can drift and still count as a tap/click

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

// Thumbnail (offer cards, review cards, My Mission photo) that opens the full, uncropped photo in a full-screen overlay.
// Phones: pinch to zoom, drag to pan, double-tap to toggle zoom. Desktop: click to
// toggle zoom, scroll wheel or trackpad pinch to zoom, drag to pan. Pinching or
// scrolling out past 100% rubber-bands and rebounds. Tapping outside the photo, the X
// button or Esc closes it. Uses a native <dialog> for the top layer, focus trapping
// and focus return.
export default function PhotoViewer({ image, fullImage, alt, imgClassName, sizes = "(max-width: 860px) 100px, 300px", buttonClassName }: PhotoViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState<View>(RESET);
  const [gesturing, setGesturing] = useState(false);
  const [fit, setFit] = useState<{ w: number; h: number } | null>(null);

  const viewRef = useRef(view);
  viewRef.current = view;
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{
    startX: number;
    startY: number;
    moved: boolean;
    pinchDist: number;
    pinchScale: number;
    lastX: number;
    lastY: number;
  } | null>(null);
  const lastTap = useRef(0);
  const downOnBackdrop = useRef(false);
  // Wheel zoom-out below 100%: the unresisted scale, and the timer that springs it back.
  const wheelRaw = useRef(1);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openViewer = () => {
    setView(RESET);
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
  const zoomAt = useCallback(
    (v: View, next: number, px: number, py: number): View => {
      const img = imgRef.current;
      if (!img) return v;
      const rect = img.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - v.x;
      const cy = rect.top + rect.height / 2 - v.y;
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

  const onPointerDown = (e: React.PointerEvent<HTMLImageElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setGesturing(true);
    const pts = [...pointers.current.values()];
    if (pts.length === 1) {
      gesture.current = { startX: e.clientX, startY: e.clientY, moved: false, pinchDist: 0, pinchScale: 1, lastX: e.clientX, lastY: e.clientY };
    } else if (pts.length === 2 && gesture.current) {
      gesture.current.moved = true;
      gesture.current.pinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      gesture.current.pinchScale = viewRef.current.s;
      gesture.current.lastX = (pts[0].x + pts[1].x) / 2;
      gesture.current.lastY = (pts[0].y + pts[1].y) / 2;
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLImageElement>) => {
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
        g.lastX = mx;
        g.lastY = my;
        return;
      }
      const zoomed = zoomAt(v, raw, mx, my);
      setView(clamp({ ...zoomed, x: zoomed.x + mx - g.lastX, y: zoomed.y + my - g.lastY }));
      g.lastX = mx;
      g.lastY = my;
      return;
    }

    if (Math.hypot(e.clientX - g.startX, e.clientY - g.startY) > MOVE_SLOP) g.moved = true;
    if (g.moved && v.s > 1) setView(clamp({ ...v, x: v.x + e.clientX - g.lastX, y: v.y + e.clientY - g.lastY }));
    g.lastX = e.clientX;
    g.lastY = e.clientY;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLImageElement>) => {
    pointers.current.delete(e.pointerId);
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
    if (!g || g.moved || e.type === "pointercancel") return;

    if (e.pointerType === "mouse") {
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
        setView(zoomAt(v, raw, px, py));
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
  }, [zoomAt]);

  return (
    <>
      <button
        type="button"
        onClick={openViewer}
        aria-label={`View full photo: ${alt}`}
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

      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClose={() => {
          setOpen(false);
          setLoaded(false);
          setFit(null);
          setView(RESET);
          pointers.current.clear();
          gesture.current = null;
        }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-[#2B2E33]/90"
      >
        <div
          className="flex h-full w-full items-center justify-center"
          onPointerDown={(e) => {
            downOnBackdrop.current = e.target === e.currentTarget;
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget && downOnBackdrop.current) closeViewer();
          }}
        >
          {open && (
            <Image
              ref={imgRef}
              src={fullImage ?? image}
              alt={alt}
              width={1600}
              height={1600}
              sizes="150vw"
              quality={85}
              draggable={false}
              onLoad={() => {
                fitToScreen();
                setLoaded(true);
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              style={{
                width: fit ? fit.w : "auto",
                height: fit ? fit.h : "auto",
                transform: `translate(${view.x}px, ${view.y}px) scale(${view.s})`,
                transition: gesturing ? "opacity 200ms" : "transform 200ms ease-out, opacity 200ms",
              }}
              className={`max-w-none touch-none select-none rounded-site shadow-site ${
                view.s > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              } ${loaded ? "opacity-100" : "opacity-0"}`}
            />
          )}
          <button
            type="button"
            onClick={closeViewer}
            aria-label="Close photo"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#2B2E33] shadow-site hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}
