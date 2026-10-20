import { Medallion } from "./Art";
import home from "@/content/home.json";

const { team } = home;
const { lead, member } = team;

export default function Team() {
  return (
    <section className="team section" id="who-we-are" aria-labelledby="team-title">
      <div className="container">
        <p className="eyebrow" data-reveal>
          <span className="eyebrow__rule" aria-hidden="true" />
          {team.eyebrow}
        </p>
        <h2 id="team-title" className="h2 team__title" data-reveal>
          {team.title}
        </h2>

        <div className="team__lead">
          <figure className="arch" data-arch>
            <div className="arch__frame">
              <Medallion id="lead" initials={lead.initials} />
            </div>
            <figcaption>
              <strong>{lead.name}</strong>
              <span>{lead.role}</span>
            </figcaption>
          </figure>

          <div className="team__copy">
            <blockquote className="team__quote" data-reveal>
              <p>{team.quote}</p>
            </blockquote>
            {lead.bio.map((p) => (
              <p key={p} className="team__bio" data-reveal>
                {p}
              </p>
            ))}
            <ul className="chips" data-reveal-group>
              {lead.credentials.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>

            <div className="member" data-reveal>
              <div className="member__photo">
                <Medallion id="member" initials={member.initials} />
              </div>
              <div>
                <h3 className="member__name">{member.name}</h3>
                <p className="member__role">{member.role}</p>
                <p className="member__bio">{member.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
