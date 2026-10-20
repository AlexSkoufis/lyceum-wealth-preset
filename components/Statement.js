import home from "@/content/home.json";

const { statement } = home;

export default function Statement() {
  const words = statement.text.split(" ");

  return (
    <section className="statement section" id="what-we-do" aria-labelledby="statement-title">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__rule" aria-hidden="true" />
          {statement.eyebrow}
        </p>
        <h2 id="statement-title" className="statement__text" data-words>
          {words.map((word, i) => (
            <span key={i} className="word">
              {word}{" "}
            </span>
          ))}
        </h2>

        <ol className="statement__pillars" data-reveal-group>
          {statement.pillars.map((p) => (
            <li key={p.num} className="pillar">
              <span className="pillar__num">{p.num}</span>
              <h3 className="pillar__title">{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
