"use client";

import { useEffect, useRef, useState } from "react";
import home from "@/content/home.json";

const { audiences } = home;

export default function Audiences() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // The accordion layout only applies once JS runs; without it every panel stays open.
  useEffect(() => {
    const list = listRef.current;
    list.classList.add("is-ready");
    return () => list.classList.remove("is-ready");
  }, []);

  return (
    <section className="audiences section section--black" id="who-we-serve" aria-labelledby="audiences-title">
      <div className="container">
        <div className="audiences__head">
          <div>
            <p className="eyebrow eyebrow--gold" data-reveal>
              <span className="eyebrow__rule" aria-hidden="true" />
              {audiences.eyebrow}
            </p>
            <h2 id="audiences-title" className="h2" data-reveal>
              {audiences.title}
            </h2>
          </div>
          <p className="lead lead--light" data-reveal>
            {audiences.lead}
          </p>
        </div>

        <ul className="aud" ref={listRef} data-reveal-group>
          {audiences.items.map((item, i) => (
            <li
              key={item.num}
              className={`aud__item${active === i ? " is-active" : ""}`}
              data-num={item.num}
              onMouseEnter={() => setActive(i)}
            >
              <button
                type="button"
                className="aud__toggle"
                aria-expanded={active === i}
                aria-controls={`aud-panel-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="aud__num">{item.num}</span>
                <span className="aud__name">{item.name}</span>
                <span className="aud__plus" aria-hidden="true" />
              </button>
              <div className="aud__panel" id={`aud-panel-${i}`}>
                <p className="aud__label">{audiences.questionLabel}</p>
                <p className="aud__question">&ldquo;{item.question}&rdquo;</p>
                <p className="aud__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="audiences__cta" data-reveal>
          <p>{audiences.cta.text}</p>
          <a className="btn btn--gold" href={audiences.cta.href} data-magnetic>
            <span>{audiences.cta.label}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
