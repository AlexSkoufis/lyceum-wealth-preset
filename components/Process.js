import { Etching } from "./Art";
import home from "@/content/home.json";

const { process } = home;

export default function Process() {
  return (
    <section className="process section" id="process" aria-labelledby="process-title" data-process data-active="0">
      <div className="container">
        <div className="process__head">
          <p className="eyebrow" data-reveal>
            <span className="eyebrow__rule" aria-hidden="true" />
            {process.eyebrow}
          </p>
          <h2 id="process-title" className="h2" data-reveal>
            {process.title}
          </h2>
          <p className="lead" data-reveal>
            {process.lead}
          </p>
        </div>

        <div className="process__body">
          <div className="process__stage" aria-hidden="true">
            <div className="process__card">
              <ol className="process__rail">
                {process.stages.map((s, i) => (
                  <li key={s.key} data-rail={i}>
                    <span className="process__rail-num">{s.num}</span>
                    <span>{s.name}</span>
                  </li>
                ))}
                <span className="process__rail-fill" />
              </ol>
              <div className="process__images">
                {process.stages.map((s, i) => (
                  <div key={s.key} className="process__image" data-image={i}>
                    <Etching name={s.image.etching} labels={s.image.labels} />
                  </div>
                ))}
              </div>
              <div className="process__numeral">
                {process.stages.map((s, i) => (
                  <span key={s.key} data-numeral={i}>
                    {s.num}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="process__panels">
            {process.stages.map((s, i) => (
              <article key={s.key} className="stage" data-stage={i} aria-labelledby={`stage-${s.key}`}>
                <div className="stage__image-mobile">
                  <Etching name={s.image.etching} labels={s.image.labels} title={s.image.alt} />
                </div>
                <p className="stage__label">
                  <span>{s.num}</span> {s.name}
                </p>
                <h3 id={`stage-${s.key}`} className="stage__headline">
                  {s.headline}
                </h3>
                {s.text.map((t) => (
                  <p key={t} className="stage__text">
                    {t}
                  </p>
                ))}
                <ul className="stage__points">
                  {s.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
