"use client";

import { useState } from "react";
import Image from "next/image";
import home from "@/content/home.json";
import site from "@/content/site.json";

const { contact } = home;
const { form } = contact;
const info = site.contact;

// No form backend yet: the request is composed into an email to the practice.
// Without JavaScript the form still posts to the mailto: action.
export default function Contact() {
  const [status, setStatus] = useState("idle");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email) {
      setStatus("error");
      return;
    }
    const lines = [
      `${form.fields.name}: ${name}`,
      `${form.fields.email}: ${email}`,
      `${form.fields.phone}: ${String(data.get("phone") || "").trim()}`,
      `${form.fields.audience}: ${String(data.get("audience") || "")}`,
      "",
      String(data.get("message") || "").trim(),
    ];
    const href = `${info.email.href}?subject=${encodeURIComponent(`${form.subject}: ${name}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.open(href, "_self");
    setStatus("sent");
  };

  return (
    <section className="contact section section--black" id="contact" aria-labelledby="contact-title">
      <div className="contact__bg" aria-hidden="true">
        <Image src={contact.image.src} alt="" fill sizes="100vw" data-contact-bg />
      </div>

      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow eyebrow--gold" data-reveal>
            <span className="eyebrow__rule" aria-hidden="true" />
            {contact.eyebrow}
          </p>
          <h2 id="contact-title" className="h2 contact__title" data-reveal>
            {contact.title}
          </h2>
          <p className="lead lead--light" data-reveal>
            {contact.lead}
          </p>

          <dl className="direct" data-reveal-group>
            <div>
              <dt>{contact.direct.callLabel}</dt>
              <dd>
                <a href={info.phone.href}>{info.phone.label}</a>
              </dd>
            </div>
            <div>
              <dt>{contact.direct.emailLabel}</dt>
              <dd>
                <a href={info.email.href}>{info.email.label}</a>
              </dd>
            </div>
            <div>
              <dt>{contact.direct.visitLabel}</dt>
              <dd>
                <address>
                  {info.address.line1}
                  <br />
                  {info.address.line2}
                </address>
                <a className="direct__map" href={info.address.mapHref} target="_blank" rel="noopener noreferrer">
                  {info.address.mapLabel}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form
          className="form"
          action={info.email.href}
          method="post"
          encType="text/plain"
          onSubmit={onSubmit}
          noValidate
          data-reveal
        >
          <h3 className="form__title">{form.title}</h3>

          <div className="form__row">
            <label className="field">
              <span>{form.fields.name}</span>
              <input name="name" type="text" autoComplete="name" required />
            </label>
            <label className="field">
              <span>{form.fields.email}</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
          </div>
          <div className="form__row">
            <label className="field">
              <span>{form.fields.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" />
            </label>
            <label className="field">
              <span>{form.fields.audience}</span>
              <select name="audience" defaultValue="">
                <option value="" disabled>
                  {form.fields.audiencePlaceholder}
                </option>
                {form.fields.audienceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="field">
            <span>{form.fields.message}</span>
            <textarea name="message" rows={4} />
          </label>

          <p className="form__note">{form.privacyNote}</p>

          <button type="submit" className="btn btn--gold form__submit">
            <span>{form.submit}</span>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <p className={`form__status form__status--${status}`} role="status" aria-live="polite">
            {status === "sent" ? form.success : status === "error" ? form.required : form.mailNote}
          </p>
          <p className="form__states">{contact.statesNote}</p>
        </form>
      </div>
    </section>
  );
}
