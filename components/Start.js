import home from "@/content/home.json";

const { start } = home;

export default function Start() {
  return (
    <section className="start section" aria-labelledby="start-title">
      <div className="container">
        <div className="start__head">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__rule" aria-hidden="true" />
            {start.eyebrow}
          </p>
          <h2 id="start-title" className="h2" data-reveal>
            {start.title}
          </h2>
        </div>

        <div className="start__body">
          <span className="start__line" aria-hidden="true">
            <span className="start__line-fill" />
          </span>
          <ol className="steps" data-reveal-group>
            {start.steps.map((s) => (
              <li key={s.num} className="step">
                <span className="step__num" aria-hidden="true">
                  {s.num}
                </span>
                <h3 className="step__title">{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="start__cta" data-reveal>
          <a className="btn btn--dark" href={start.cta.href} data-magnetic>
            <span>{start.cta.label}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
