import home from "@/content/home.json";

const { marquee } = home;

function Row({ hidden }) {
  return (
    <ul className="marquee__row" aria-hidden={hidden || undefined}>
      {marquee.map((item) => (
        <li key={item}>
          <span>{item}</span>
          <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
            <path d="M10 0 13 7 20 10 13 13 10 20 7 13 0 10 7 7Z" fill="currentColor" />
          </svg>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="marquee" data-marquee>
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
