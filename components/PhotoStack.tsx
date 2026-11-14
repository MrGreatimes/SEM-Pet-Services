"use client";

import { useEffect, useRef, useState } from "react";
import PhotoViewer from "@/components/PhotoViewer";
import { useLang } from "@/components/LangRoot";

export type StackPhoto = {
  image: string;
  alt: string;
  // Crop for the card (object-position etc.); the full photo opens uncropped.
  imgClassName?: string;
};

// The My Mission photos as a small pile of prints (owner's choice 2026-11-12: a subtle
// hint that there are more photos, with nothing drawn over them). The top photo sits
// straight; the others peek out behind it, tilted and offset. Drag the top photo left
// or right past the one below and let go, and it tucks behind the pile (next); let go
// sooner and it springs back. Both directions behave the same, mirrored (owner request
// 2026-11-12). Going back a photo is the trackpad (swipe right) or the hidden Previous
// button. Horizontal trackpad swipes work too. Tapping the top photo opens it
// full screen (PhotoViewer); a drag never counts as a tap. Small dots fade in below the
// pile while swiping and fade out 1.5s later. Keyboard and screen reader users get
// Previous/Next buttons that are invisible until focused. Fills its parent, which sets
// the size.
const POSES = [
  "translate(0, 0) rotate(0deg)",
  "translate(5%, 2%) rotate(4deg) scale(0.97)",
  "translate(-5%, 3%) rotate(-4deg) scale(0.95)",
];
const DOTS_MS = 1500;

// Motion. The owner picked "Spring" on 2026-11-12 after trying Toss, Spring, Tuck, Flick
// and Drift, then tuned every number below by feel the same day.
//   out: how far a button/trackpad "next" carries the card, as a share of the box width
//   rot: degrees of tilt per 100px of travel
//   outMs/outEase: that carry;  settleMs/settleEase: cards sliding into new places (bouncy)
const m = {
  out: 1.0,
  rot: 2.5,
  outMs: 220,
  outEase: "cubic-bezier(0.3, 0.7, 0.4, 1)",
  settleMs: 560,
  settleEase: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};
// The card is 88% of the box wide (inset-x-[6%]).
const CARD_W = 0.88;
// Dragging either way, the photo only tucks behind if it is let go after clearing the photo
// below it: about one card width (was 1.12; lowered because a photo that looked clear
// still came back). Nothing happens until the finger lifts.
const CLEAR = 1.0;
// Left, it can be dragged only until its center reaches the left edge of the text column
// (the grid the stack sits in); right, only as far as the finger can go before the
// screen's edge (the stack sits near the right edge, so there is less room that way). It follows the finger 1:1 for the first FREE share of that
// distance, then resists more and more (a rubber band); the finger can keep going.
const FREE = 0.2;
// On release it swings past where it is headed by (distance pulled x OVERSHOOT), then
// settles: past center when it springs back, a little past its spot when it tucks.
const OVERSHOOT = 0.1;
// After a tuck, the next photo can be grabbed this soon (owner: waiting felt too long).
const READY_MS = 100;
// The scripted swings (spring-back and tuck) slow at each turn, like a spring.
const SWING_EASE = "cubic-bezier(0.37, 0, 0.63, 1)";
const TUCK_MS = 750;

// A card shifted sideways by x px, tilted to match.
const pose = (x: number) => `translateX(${x}px) rotate(${(x / 100) * m.rot}deg)`;
// Stops scripted swings on a card (CSS transitions are left alone).
const cancelSwings = (el: HTMLElement) =>
  el.getAnimations().forEach((a) => {
    if (!(a instanceof CSSTransition)) a.cancel();
  });

export default function PhotoStack({ photos, label, sizes }: { photos: StackPhoto[]; label: string; sizes?: string }) {
  const n = photos.length;
  const es = useLang() === "es";
  const viewerPhotos = photos.map(({ image, alt }) => ({ image, alt }));
  const boxRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);
  const [drag, setDrag] = useState<number | null>(null);
  // A card mid-flight (buttons/trackpad): off to the side, with its own stacking level.
  const [fly, setFly] = useState<{ card: number; x: number; z: number } | null>(null);
  const [dots, setDots] = useState(false);
  // Cards playing a scripted swing (several can at once: one still tucking behind while
  // the next is already being dragged). Their CSS transition is off meanwhile so the two
  // don't fight.
  const [scripted, setScripted] = useState<number[]>([]);

  const busy = useRef(false);
  const pointer = useRef<{
    id: number;
    x: number;
    y: number;
    dragging: boolean;
    limitL: number;
    limitR: number;
    last: number;
    el: HTMLElement;
  } | null>(null);
  const suppressClick = useRef(false);
  const dotsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const wheelLock = useRef(0);
  // Removes the window listeners of a drag in progress (also run on unmount).
  const stopListening = useRef<(() => void) | null>(null);
  // Always this render's move/end handlers, for the window listeners to call.
  const handlers = useRef<{ move: (e: PointerEvent) => void; end: (e: PointerEvent) => void } | null>(null);

  useEffect(
    () => () => {
      clearTimeout(dotsTimer.current);
      stopListening.current?.();
    },
    [],
  );

  const flashDots = () => {
    setDots(true);
    clearTimeout(dotsTimer.current);
    dotsTimer.current = setTimeout(() => setDots(false), DOTS_MS);
  };
  const width = () => boxRef.current?.offsetWidth ?? 300;

  const play = (card: number, el: HTMLElement, frames: Keyframe[], ms: number) => {
    cancelSwings(el);
    setScripted((s) => (s.includes(card) ? s : [...s, card]));
    const anim = el.animate(frames, { duration: ms });
    const done = () => setScripted((s) => s.filter((c) => c !== card));
    anim.onfinish = done;
    anim.oncancel = done;
  };

  // Next (buttons/trackpad): the top photo flies off to the left, then settles at the back.
  const next = () => {
    if (busy.current) return;
    busy.current = true;
    flashDots();
    const card = top;
    setFly({ card, x: -width() * m.out, z: n + 1 });
    setTimeout(() => {
      setTop((card + 1) % n);
      setFly(null);
      busy.current = false;
    }, m.outMs);
  };
  // Previous: the bottom photo slides out to the right behind the pile, then comes back
  // in on top.
  const prev = () => {
    if (busy.current) return;
    busy.current = true;
    flashDots();
    const card = (top - 1 + n) % n;
    setFly({ card, x: width() * m.out, z: 0 });
    setTimeout(() => {
      setTop(card);
      setFly(null);
      busy.current = false;
    }, m.outMs);
  };

  // How far the top photo may travel each way: left until its center meets the text
  // column's left edge, right as far as the finger has room to the screen's edge.
  const limits = (card: HTMLElement, fingerX: number) => {
    const r = card.getBoundingClientRect();
    const center = r.left + r.width / 2;
    const grid = boxRef.current?.parentElement?.parentElement;
    const textLeft = grid ? grid.getBoundingClientRect().left + parseFloat(getComputedStyle(grid).paddingLeft || "0") : 0;
    return { limitL: Math.max(0, center - textLeft), limitR: Math.max(0, document.documentElement.clientWidth - fingerX) };
  };

  // The rubber band (see FREE), the same both ways.
  const resist = (dx: number, p: { limitL: number; limitR: number }) => {
    const limit = dx < 0 ? p.limitL : p.limitR;
    if (dx === 0 || !isFinite(limit)) return dx;
    if (limit <= 0) return 0;
    const free = limit * FREE;
    const d = Math.abs(dx);
    if (d <= free) return dx;
    const band = limit - free;
    return Math.sign(dx) * (free + band * (1 - Math.exp(-(d - free) / band)));
  };

  // Move/up/cancel are listened for on the window for the length of a drag, so the release
  // is always seen even if the finger or mouse ends up off the photo (pointer capture alone
  // was not reliable).
  // Events from the open full-screen viewer (outside this box in the page, though inside
  // it in React's tree) must never move the stack.
  const fromStack = (e: React.SyntheticEvent) => !!boxRef.current?.contains(e.target as Node);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || busy.current || !fromStack(e)) return;
    const el = e.currentTarget as HTMLElement;
    cancelSwings(el); // grabbing it mid-swing stops the swing
    pointer.current = { id: e.pointerId, x: e.clientX, y: e.clientY, dragging: false, limitL: Infinity, limitR: Infinity, last: 0, el };
    suppressClick.current = false;
    stopListening.current?.();
    const move = (ev: PointerEvent) => handlers.current?.move(ev);
    const end = (ev: PointerEvent) => {
      stop();
      handlers.current?.end(ev);
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", end);
      window.removeEventListener("pointercancel", end);
      stopListening.current = null;
    };
    stopListening.current = stop;
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", end);
    window.addEventListener("pointercancel", end);
  };
  const onPointerMove = (e: PointerEvent) => {
    const p = pointer.current;
    if (!p || p.id !== e.pointerId) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (!p.dragging) {
      if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
        p.dragging = true;
        Object.assign(p, limits(p.el, p.x));
        try {
          p.el.setPointerCapture(e.pointerId);
        } catch {}
      } else if (Math.abs(dy) > 8) {
        pointer.current = null; // vertical: let the page scroll
        return;
      } else return;
    }
    flashDots();
    p.last = resist(dx, p);
    setDrag(p.last);
  };
  const onPointerEnd = (e: PointerEvent) => {
    const p = pointer.current;
    pointer.current = null;
    if (!p || p.id !== e.pointerId || !p.dragging) return;
    suppressClick.current = true;
    // A cancelled pointer has no reliable position; use the last one seen while dragging.
    const dx = e.type === "pointercancel" ? p.last : resist(e.clientX - p.x, p);
    setDrag(null);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // (The tuck point is capped at half the drag limit so it is always reachable with the
    // rubber band on; on a phone there is little room to the right, so a right tuck needs
    // a shorter pull than a left one.)
    const limit = dx < 0 ? p.limitL : p.limitR;
    if (dx !== 0 && Math.abs(dx) >= Math.min(width() * CARD_W * CLEAR, limit * 0.5)) {
      // Tuck: it drops behind the pile, swings a little past its spot and settles there.
      // The next photo can be grabbed almost at once while this one finishes on its own.
      busy.current = true;
      setTimeout(() => (busy.current = false), READY_MS);
      const card = top;
      setTop((top + 1) % n);
      if (reduced) return;
      play(
        card,
        p.el,
        [
          { transform: pose(dx), easing: SWING_EASE },
          { transform: `${pose(-dx * OVERSHOOT)} scale(0.95)`, offset: 0.5, easing: SWING_EASE },
          { transform: POSES[POSES.length - 1] },
        ],
        TUCK_MS,
      );
    } else {
      // Spring-back: it swings past center by a tenth of the pull (the photo's travel, not
      // the finger's), then settles. Longer pulls take a bit longer.
      if (dx === 0 || reduced) return;
      const f = Math.min(1, Math.abs(dx) / (width() * CARD_W)); // 0..1 of a card width
      play(
        top,
        p.el,
        [
          { transform: pose(dx), easing: SWING_EASE },
          { transform: pose(-dx * OVERSHOOT), offset: 0.5, easing: SWING_EASE },
          { transform: POSES[0] },
        ],
        Math.round(450 + 550 * f),
      );
    }
  };
  handlers.current = { move: onPointerMove, end: onPointerEnd };

  // A drag ends with a click; swallow it (on the whole stack) so it doesn't open the viewer.
  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClick.current && fromStack(e)) {
      suppressClick.current = false;
      e.stopPropagation();
      e.preventDefault();
    }
  };
  // Horizontal trackpad swipe: one photo per gesture.
  const onWheel = (e: React.WheelEvent) => {
    if (!fromStack(e) || Math.abs(e.deltaX) < 25 ||Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    const now = Date.now();
    if (now - wheelLock.current < 600) return;
    wheelLock.current = now;
    if (e.deltaX > 0) next();
    else prev();
  };

  const hidden =
    "sr-only focus:not-sr-only focus:absolute focus:z-50 focus:-bottom-9 focus:px-3 focus:py-1 focus:rounded-full focus:bg-card focus:text-charcoal focus:text-[0.85rem] focus:font-semibold focus:shadow-site";

  return (
    <div
      ref={boxRef}
      role="region"
      aria-roledescription={es ? "carrusel" : "carousel"}
      aria-label={label}
      className="absolute inset-0"
      onWheel={onWheel}
      onClickCapture={onClickCapture}
    >
      {photos.map((p, i) => {
        const depth = (i - top + n) % n;
        const isTop = depth === 0;
        const flying = fly?.card === i;
        const dragging = isTop && drag !== null && !flying;
        const transform = flying ? pose(fly.x) : dragging ? pose(drag) : POSES[Math.min(depth, POSES.length - 1)];
        return (
          <div
            key={p.image}
            aria-hidden={!isTop || undefined}
            inert={!isTop || undefined}
            onPointerDown={isTop ? onPointerDown : undefined}
            // Stop the browser's own "drag the image" behavior: with a mouse it cancels the
            // pointer mid-drag, so the release (tuck or spring-back) never ran.
            onDragStart={(e) => e.preventDefault()}
            style={{
              transform,
              zIndex: flying ? fly.z : n - depth,
              transition:
                dragging || scripted.includes(i)
                  ? "none"
                  : flying
                    ? `transform ${m.outMs}ms ${m.outEase}`
                    : `transform ${m.settleMs}ms ${m.settleEase}`,
            }}
            className={`absolute inset-x-[6%] top-[3%] bottom-[9%] rounded-site motion-reduce:!transition-none select-none ${
              isTop
                ? "touch-pan-y shadow-[0_4px_10px_rgba(58,46,40,0.1),0_20px_40px_rgba(58,46,40,0.16)]"
                : "pointer-events-none shadow-[0_2px_8px_rgba(58,46,40,0.14)]"
            }`}
          >
            {/* Pointing-hand cursor on the stack (owner request), not the viewer's magnifier. */}
            {/* In the viewer, swipe through all the photos; closing it leaves the photo
                last viewed on top of the pile. */}
            <PhotoViewer
              image={p.image}
              alt={p.alt}
              imgClassName={p.imgClassName}
              sizes={sizes}
              buttonClassName="!cursor-pointer"
              gallery={{ photos: viewerPhotos, index: i, onClose: setTop }}
            />
          </div>
        );
      })}

      {/* Dots in the gap below the pile (never over a photo); only while swiping. */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-[9%] flex items-center justify-center gap-1.5 transition-opacity duration-300 ${
          dots ? "opacity-100" : "opacity-0"
        }`}
      >
        {photos.map((p, i) => (
          <span key={p.image} className={`block w-1.5 h-1.5 rounded-full ${i === top ? "bg-charcoal-soft" : "bg-charcoal-soft/30"}`} />
        ))}
      </div>

      <button type="button" onClick={prev} className={`${hidden} focus:left-0`}>
        {es ? "Foto anterior" : "Previous photo"}
      </button>
      <button type="button" onClick={next} className={`${hidden} focus:right-0`}>
        {es ? "Foto siguiente" : "Next photo"}
      </button>
      <p className="sr-only" aria-live="polite">
        {es ? `Foto ${top + 1} de ${n}` : `Photo ${top + 1} of ${n}`}
      </p>
    </div>
  );
}
