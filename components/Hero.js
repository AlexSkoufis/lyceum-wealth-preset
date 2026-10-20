import home from "@/content/home.json";
import { Emblem } from "./Art";
import site from "@/content/site.json";

const { hero } = home;

// Dial ticks around the emblem, like the edge of an engraved seal.
const TICKS = Array.from({ length: 72 }, (_, i) => i * 5);

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__hatch" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="hero__inner container">
        <div className="hero__copy">
          <p className="eyebrow eyebrow--gold hero__eyebrow" data-hero-fade>
            <span className="eyebrow__rule" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1 id="hero-title" className="hero__title">
            {hero.title.map((line) => (
              <span key={line.text} className={`hero__line hero__line--${line.style}`}>
                <span className="hero__line-inner">{line.text}</span>
              </span>
            ))}
          </h1>

          <p className="hero__lead" data-hero-fade>
            {hero.lead}
          </p>

          <div className="hero__ctas" data-hero-fade>
            <a className="btn btn--gold" href={hero.primary.href} data-magnetic>
              <span>{hero.primary.label}</span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </a>
            <a className="btn btn--ghost" href={hero.secondary.href}>
              <span>{hero.secondary.label}</span>
            </a>
          </div>
        </div>

        <div className="hero__seal" aria-hidden="true">
          <div className="seal" data-seal>
            <svg className="seal__lines" viewBox="0 0 600 600">
              <circle className="seal__circle" cx="300" cy="300" r="292" pathLength="1" />
              <circle className="seal__circle seal__circle--thin" cx="300" cy="300" r="250" pathLength="1" />
              <circle className="seal__circle" cx="300" cy="300" r="172" pathLength="1" />
              <g className="seal__ticks">
                {TICKS.map((deg) => (
                  <line
                    key={deg}
                    x1="300"
                    y1="10"
                    x2="300"
                    y2={deg % 30 === 0 ? 34 : 22}
                    transform={`rotate(${deg} 300 300)`}
                  />
                ))}
              </g>
            </svg>
            <svg className="seal__ring" viewBox="0 0 600 600">
              <defs>
                <path id="seal-ring-path" d="M300,300 m-212,0 a212,212 0 1,1 424,0 a212,212 0 1,1 -424,0" />
              </defs>
              <text>
                <textPath href="#seal-ring-path" textLength="1328">
                  {hero.ring.repeat(2)}
                </textPath>
              </text>
            </svg>
            <div className="seal__emblem" data-seal-emblem>
              <Emblem />
            </div>
          </div>
        </div>
      </div>

      <div className="hero__facts container">
        <ul className="facts" data-hero-facts>
          {hero.facts.map((fact) => (
            <li key={fact.label}>
              <strong>{fact.label}</strong>
              <span>{fact.text}</span>
            </li>
          ))}
        </ul>
        <a className="hero__scroll" href="#what-we-do">
          <span>{hero.scrollHint}</span>
          <span className="hero__scroll-line" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
