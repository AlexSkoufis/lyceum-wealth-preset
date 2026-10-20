"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "@/lib/gsap";

// Page-wide motion. Every effect is set up from JavaScript, so without JS
// (or with reduced motion) all content stays in its final, visible state.
export default function Motion() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    // Process: highlight the stage in view. Runs with or without reduced motion,
    // since it only swaps which illustration is shown.
    const process = document.querySelector("[data-process]");
    const stageTriggers = [];
    if (process) {
      process.dataset.ready = "1";
      gsap.utils.toArray("[data-stage]").forEach((stage) => {
        stageTriggers.push(
          ScrollTrigger.create({
            trigger: stage,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              if (self.isActive) process.dataset.active = stage.dataset.stage;
            },
          })
        );
      });
    }

    mm.add(MOTION_OK, () => {
      const cleanups = [];

      // Header progress line.
      gsap.fromTo(
        ".site-header__progress",
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } }
      );

      // Hero intro.
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".hero__line-inner", { yPercent: 110, rotate: 2, duration: 1.3, stagger: 0.12 })
        .from("[data-hero-fade]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, "-=0.9")
        .from(".seal__circle", { strokeDashoffset: 1, duration: 2, ease: "power2.inOut", stagger: 0.15 }, 0.1)
        .from(".seal__ticks line", { autoAlpha: 0, duration: 0.6, stagger: { each: 0.008, from: "random" } }, 0.4)
        .from("[data-seal-emblem]", { scale: 0.6, rotate: -40, autoAlpha: 0, duration: 1.6, ease: "expo.out" }, 0.5)
        .from(".seal__ring", { autoAlpha: 0, scale: 0.9, duration: 1.4 }, 0.8)
        .from("[data-hero-facts] li", { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, "-=1.2");

      // Hero depth on scroll.
      gsap.to(".hero__copy", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-seal]", {
        yPercent: 18,
        rotate: 24,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Marquee leans with scroll speed.
      const track = document.querySelector(".marquee__track");
      if (track) {
        const skewTo = gsap.quickTo(track, "skewX", { duration: 0.5, ease: "power3.out" });
        const st = ScrollTrigger.create({
          trigger: "[data-marquee]",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => skewTo(gsap.utils.clamp(-8, 8, self.getVelocity() / -300)),
          onLeave: () => skewTo(0),
          onLeaveBack: () => skewTo(0),
        });
        cleanups.push(() => st.kill());
      }

      // Single reveals.
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      // Staggered groups: direct children animate in sequence.
      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        gsap.fromTo(
          group.children,
          { y: 36, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: group, start: "top 88%", once: true },
          }
        );
      });

      // Statement: words ink in as you read down.
      const words = gsap.utils.toArray("[data-words] .word");
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-words]", start: "top 80%", end: "bottom 45%", scrub: 0.5 },
          }
        );
      }

      // Temple rises out of the dark.
      gsap.fromTo(
        "[data-temple] img",
        { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.8,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-temple]", start: "top 80%", once: true },
        }
      );

      // Process rail fills with the panels.
      gsap.fromTo(
        ".process__rail-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".process__panels", start: "top 60%", end: "bottom 60%", scrub: 0.4 },
        }
      );

      // Portrait arch opens upward.
      gsap.fromTo(
        "[data-arch] .arch__frame",
        { clipPath: "inset(100% 0 0 0 round 999px 999px 0 0)" },
        {
          clipPath: "inset(0% 0 0 0 round 999px 999px 0 0)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-arch]", start: "top 80%", once: true },
        }
      );
      gsap.fromTo(
        "[data-arch] img",
        { yPercent: 8 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: { trigger: "[data-arch]", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // Getting started: the line draws between the steps.
      gsap.fromTo(
        ".start__line-fill",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".start__body", start: "top 75%", end: "bottom 55%", scrub: 0.6 },
        }
      );

      // Insight images uncover.
      gsap.utils.toArray(".post__media").forEach((media, i) => {
        gsap.fromTo(
          media,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.3,
            delay: i * 0.12,
            ease: "power3.inOut",
            scrollTrigger: { trigger: media, start: "top 88%", once: true },
          }
        );
      });

      // Contact backdrop drifts.
      gsap.fromTo(
        "[data-contact-bg]",
        { yPercent: -8, scale: 1.15 },
        {
          yPercent: 8,
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: true },
        }
      );

      // Pointer-only niceties.
      if (window.matchMedia("(pointer: fine)").matches) {
        // Magnetic buttons.
        gsap.utils.toArray("[data-magnetic]").forEach((btn) => {
          const xTo = gsap.quickTo(btn, "x", { duration: 0.5, ease: "power3.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e) => {
            const r = btn.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.32);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          btn.addEventListener("mousemove", move);
          btn.addEventListener("mouseleave", leave);
          cleanups.push(() => {
            btn.removeEventListener("mousemove", move);
            btn.removeEventListener("mouseleave", leave);
          });
        });

        // Hero seal tilts toward the cursor.
        const hero = document.querySelector(".hero");
        const emblem = document.querySelector("[data-seal-emblem]");
        const ring = document.querySelector(".seal__ring");
        if (hero && emblem && ring) {
          const ex = gsap.quickTo(emblem, "x", { duration: 0.9, ease: "power3.out" });
          const ey = gsap.quickTo(emblem, "y", { duration: 0.9, ease: "power3.out" });
          const rx = gsap.quickTo(ring, "x", { duration: 1.2, ease: "power3.out" });
          const ry = gsap.quickTo(ring, "y", { duration: 1.2, ease: "power3.out" });
          const move = (e) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            ex(nx * 36);
            ey(ny * 36);
            rx(nx * -14);
            ry(ny * -14);
          };
          hero.addEventListener("mousemove", move);
          cleanups.push(() => hero.removeEventListener("mousemove", move));
        }
      }

      // Fonts can shift layout after first paint.
      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => cleanups.forEach((fn) => fn());
    });

    return () => {
      stageTriggers.forEach((t) => t.kill());
      if (process) delete process.dataset.ready;
      mm.revert();
    };
  }, []);

  return null;
}
