import { Wordmark } from "./Art";
import site from "@/content/site.json";

const { footer, brand, contact } = site;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Wordmark className="footer__logo" label={brand.logo.alt} />
            <p className="footer__tagline">{brand.tagline}</p>
          </div>
          <div className="footer__cta">
            <p>{footer.ctaTitle}</p>
            <a className="btn btn--gold" href={footer.ctaButton.href} data-magnetic>
              <span>{footer.ctaButton.label}</span>
            </a>
          </div>
        </div>

        <div className="footer__cols">
          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="footer__heading">{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <h2 className="footer__heading">{footer.contactTitle}</h2>
            <address className="footer__address">
              {contact.address.line1}
              <br />
              {contact.address.line2}
            </address>
            <ul>
              <li>
                <a href={contact.phone.href}>{contact.phone.label}</a>
              </li>
              <li>
                <a href={contact.email.href}>{contact.email.label}</a>
              </li>
              <li className="footer__muted">
                {footer.faxLabel}: {contact.fax}
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__legal">
          <p>
            {footer.brokercheck.text}{" "}
            <a href={footer.brokercheck.href} target="_blank" rel="noopener noreferrer">
              {footer.brokercheck.label}
            </a>
            .
          </p>
          {footer.disclosures.map((d) => (
            <p key={d}>{d}</p>
          ))}
          <p>
            {footer.privacy.text} <a href={footer.privacy.href}>{footer.privacy.label}</a>.
          </p>
        </div>

        <div className="footer__bottom">
          <p>
            &copy;{year} {footer.copyright}
          </p>
          <p className="footer__credit">
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
