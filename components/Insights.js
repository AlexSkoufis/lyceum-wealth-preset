import Image from "next/image";
import home from "@/content/home.json";

const { insights } = home;

export default function Insights() {
  return (
    <section className="insights section" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <div className="insights__head">
          <div>
            <p className="eyebrow" data-reveal>
              <span className="eyebrow__rule" aria-hidden="true" />
              {insights.eyebrow}
            </p>
            <h2 id="insights-title" className="h2" data-reveal>
              {insights.title}
            </h2>
          </div>
          <a className="link-arrow" href={insights.all.href} data-reveal>
            {insights.all.label}
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </a>
        </div>

        <ul className="posts" data-reveal-group>
          {insights.posts.map((post) => (
            <li key={post.title}>
              <a className="post" href={post.href}>
                <div className="post__media">
                  <Image
                    src={post.image.src}
                    width={post.image.width}
                    height={post.image.height}
                    alt={post.image.alt}
                    sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 30vw"
                  />
                </div>
                <div className="post__meta">
                  <time dateTime={post.date}>{post.dateLabel}</time>
                  <span>{post.tag}</span>
                </div>
                <h3 className="post__title">{post.title}</h3>
                <span className="post__read">
                  {insights.readLabel}
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
