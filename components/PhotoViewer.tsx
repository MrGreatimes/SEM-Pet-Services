"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type PhotoViewerProps = {
  image: string;
  // Optional separate file for the full-screen view (e.g. a copy with a watermark trimmed off).
  fullImage?: string;
  alt: string;
  imgClassName?: string;
};

const MAX_SCALE = 4;
const TAP_ZOOM = 2.5;
const DOUBLE_TAP_MS = 300;
const MOVE_SLOP = 6; // px a pointer can drift and still count as a tap/click

type View = { s: number; x: number; y: number };
const RESET: View = { s: 1, x: 0, y: 0 };

// Offer card thumbnail that opens the full, uncropped photo in a full-screen overlay.
// Phones: pinch to zoom, drag to pan, double-tap to toggle zoom. Desktop: click to
// toggle zoom, scroll wheel to zoom, drag to pan. Tapping outside the photo, the X
// button or Esc closes it. Uses a native <dialog> for the top layer, focus trapping
// and focus return.
export default function PhotoViewer({ image, fullImage, alt, imgClassName }: PhotoViewerProps) {
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
      const zoomed = zoomAt(v, (g.pinchScale * dist) / g.pinchDist, mx, my);
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

  const onWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    const v = viewRef.current;
    setView(zoomAt(v, v.s * Math.exp(-e.deltaY * 0.002), e.clientX, e.clientY));
  };

  return (
    <>
      <button
        type="button"
        onClick={openViewer}
        aria-label={`View full photo: ${alt}`}
        className="group absolute inset-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-primary"
      >
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 860px) 100px, 300px"
          className={`object-cover transition-transform duration-300 group-hover:scale-[1.03] ${imgClassName ?? ""}`}
        />
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
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-charcoal/90"
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
              onWheel={onWheel}
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
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-charcoal shadow-site hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
