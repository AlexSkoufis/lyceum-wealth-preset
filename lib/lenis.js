"use client";

// Shared handle so other components (mobile menu, anchor links) can reach the Lenis instance.
let instance = null;

export function setLenis(lenis) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}

export function scrollToTarget(target) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.start();
    lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ block: "start" });
  }
}
