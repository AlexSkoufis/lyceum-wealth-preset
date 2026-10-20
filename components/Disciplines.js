"use client";

import { useEffect, useRef, useState } from "react";
import { Etching } from "./Art";
import home from "@/content/home.json";

const { disciplines } = home;

export default function Disciplines() {
  const [active, setActive] = useState(null);
  const [auto, setAuto] = useState(null);
  const userRef = useRef(false);
  const rootRef = useRef(null);

  // While the section is on screen and nobody is interacting, walk through the columns.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        clearInterval(timer);
        if (!entry.isIntersecting) return;
        timer = setInterval(() => {
          if (userRef.current) return;
          setAuto((i) => (i === null ? 0 : (i + 1) % disciplines.items.length));
        }, 2600);
      },
      { threshold: 0.35 }
    );
    io.observe(rootRef.current);
    return () => {
      clearInterval(timer);
      io.disconnect();
    };
  }, []);

  const current = active ?? auto;
  const pick = (i) => {
    userRef.current = true;
    setActive(i);
  };
  const release = () => {
    userRef.current = false;
    setActive(null);
  };

  return (
    <section className="disciplines section section--dark" aria-labelledby="disciplines-title" ref={rootRef}>
      <div className="container disciplines__grid">
        <div className="disciplines__head">
          <p className="eyebrow eyebrow--gold" data-reveal>
            <span className="eyebrow__rule" aria-hidden="true" />
            {disciplines.eyebrow}
          </p>
          <h2 id="disciplines-title" className="h2" data-reveal>
            {disciplines.title}
          </h2>
          <p className="lead lead--light" data-reveal>
            {disciplines.lead}
          </p>
        </div>

        <figure
          className={`temple${current !== null ? " is-lit" : ""}`}
          style={{ "--x": `${current !== null ? disciplines.items[current].x : 50}%` }}
          data-temple
        >
          <Etching
            name="temple"
            labels={disciplines.items.map((d) => d.name)}
            title={disciplines.image.alt}
          />
          <span className="temple__beam" aria-hidden="true" />
          <figcaption className="temple__hint">{disciplines.hint}</figcaption>
        </figure>

        <ol className="disciplines__list" onMouseLeave={release} data-reveal-group>
          {disciplines.items.map((item, i) => (
            <li
              key={item.name}
              className={`discipline${current === i ? " is-active" : ""}`}
              onMouseEnter={() => pick(i)}
              onClick={() => pick(i)}
            >
              <span className="discipline__num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="discipline__name">{item.name}</h3>
                <p className="discipline__text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
