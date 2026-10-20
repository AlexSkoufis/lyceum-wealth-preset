"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "./Art";
import site from "@/content/site.json";
import { gsap, MOTION_OK } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

const { header, brand, contact } = site;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  // Solid background after leaving the top, hide on scroll down, show on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let contactVisible = false;
    const contactEl = document.getElementById("contact");
    const io = contactEl
      ? new IntersectionObserver(([entry]) => {
          contactVisible = entry.isIntersecting;
          setShowBar(window.scrollY > 640 && !contactVisible);
        })
      : null;
    if (io) io.observe(contactEl);

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 360 && y > last + 2);
      if (y < last - 2) setHidden(false);
      setShowBar(y > 640 && !contactVisible);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  // Mobile menu: lock scroll, animate links, close on Escape.
  useEffect(() => {
    const lenis = getLenis();
    if (!open) {
      lenis?.start();
      document.documentElement.classList.remove("menu-open");
      return;
    }
    lenis?.stop();
    document.documentElement.classList.add("menu-open");

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.from(panelRef.current.querySelectorAll("[data-menu-item]"), {
        yPercent: 80,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.15,
      });
    });

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.querySelector("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      mm.revert();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`site-header${scrolled ? " is-scrolled" : ""}${hidden && !open ? " is-hidden" : ""}${open ? " is-open" : ""}`}
      >
        <a className="skip-link" href="#main">
          {header.skipLink}
        </a>
        <div className="site-header__progress" aria-hidden="true" />
        <div className="site-header__bar container">
          <a className="site-header__logo" href="#top" aria-label={header.homeLabel} onClick={close}>
            <Wordmark label={brand.logo.alt} />
          </a>

          <nav className="site-nav" aria-label="Primary">
            <ul>
              {header.nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="site-nav__link">
                    <span data-text={item.label}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-header__actions">
            <a className="site-header__phone" href={contact.phone.href}>
              {contact.phone.label}
            </a>
            <a className="site-header__login" href={header.login.href}>
              {header.login.label}
            </a>
            <a className="btn btn--gold btn--sm" href={header.cta.href} data-magnetic>
              <span>{header.cta.label}</span>
            </a>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? header.menuClose : header.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        <div id="mobile-menu" ref={panelRef} className="mobile-menu" hidden={!open}>
          <div className="mobile-menu__inner container">
            <p className="eyebrow" data-menu-item>
              {header.menuTitle}
            </p>
            <ul>
              {header.nav.map((item) => (
                <li key={item.label} data-menu-item>
                  <a href={item.href} onClick={close}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li data-menu-item>
                <a href={header.login.href} onClick={close}>
                  {header.login.label}
                </a>
              </li>
            </ul>
            <div className="mobile-menu__foot" data-menu-item>
              <a className="btn btn--gold" href={header.cta.href} onClick={close}>
                <span>{header.cta.label}</span>
              </a>
              <a className="mobile-menu__contact" href={contact.phone.href}>
                {contact.phone.label}
              </a>
              <a className="mobile-menu__contact" href={contact.email.href}>
                {contact.email.label}
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-bar${showBar && !open ? " is-visible" : ""}`}>
        <a className="mobile-bar__call" href={contact.phone.href}>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z"
              fill="currentColor"
            />
          </svg>
          {header.mobileBar.call}
        </a>
        <a className="mobile-bar__book" href={header.cta.href}>
          {header.mobileBar.book}
        </a>
      </div>
    </>
  );
}
