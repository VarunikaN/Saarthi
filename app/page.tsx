import Image from "next/image";
import { Assistant } from "@/components/assistant";
import { sources } from "@/lib/sources";

export default function Page() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">Saarthi / verified-source navigator</div>
        <h1>Find the official path, not a confident guess.</h1>
        <p className="lede">
          A citation-grounded assistant for education, employment, worker support, farmer services, public benefits, digital documents, and health-insurance navigation.
        </p>
        <div className="guardrails">
          <span>Official sources only</span>
          <span>Citations required</span>
          <span>No eligibility decisions</span>
        </div>
      </section>

      <Assistant />

      <section className="coverage" aria-labelledby="coverage-title">
        <div>
          <div className="eyebrow">Coverage map</div>
          <h2 id="coverage-title">Life events, routed to official services.</h2>
        </div>
        <div className="coverage-grid">
          <article><span>01</span><strong>Education</strong><p>Scholarships, application portals, and document preparation.</p></article>
          <article><span>02</span><strong>Work and income</strong><p>Career services, worker records, and farmer programme resources.</p></article>
          <article><span>03</span><strong>Public services</strong><p>Scheme discovery, digital documents, and official application paths.</p></article>
          <article><span>04</span><strong>Health support</strong><p>PM-JAY information, beneficiary channels, and coverage verification paths.</p></article>
        </div>
      </section>

      <section className="source-ledger" aria-labelledby="sources-title">
        <div>
          <div className="eyebrow">Source ledger</div>
          <h2 id="sources-title">A small, visible corpus is safer than a vague promise.</h2>
        </div>
        <div className="source-grid">
          {sources.map((source) => (
            <a className="source-card" href={source.url} key={source.id} rel="noreferrer" target="_blank">
              <span>{source.domain}</span>
              <strong>{source.title}</strong>
              <small>Official source · review before relying</small>
            </a>
          ))}
        </div>
      </section>

      <section className="creator" aria-labelledby="creator-title">
        <Image alt="Varunika Naini" height={160} src="https://myweb-ten-red.vercel.app/images/portrait/me.jpg" width={160} />
        <div>
          <div className="eyebrow">Project contact</div>
          <h2 id="creator-title">Varunika Naini</h2>
          <p>AI and ML Engineer building reliable, source-aware systems for real-world decision support.</p>
          <div className="contact-links">
            <a href="mailto:varunikaanaini@gmail.com">varunikaanaini@gmail.com</a>
            <a href="tel:+917032599534">+91 7032599534</a>
            <a href="https://www.linkedin.com/in/varunika-naini-631b5b2b3" rel="noreferrer" target="_blank">LinkedIn</a>
            <a href="https://github.com/VarunikaN" rel="noreferrer" target="_blank">GitHub</a>
          </div>
        </div>
      </section>

      <footer className="rights-notice">
        <strong>Copyright © 2026 Varunika Naini. All rights reserved.</strong>
        <span>Saarthi source curation, interface design, and implementation are proprietary. Licensing, collaboration, and intellectual-property enquiries: varunikaanaini@gmail.com</span>
      </footer>
    </main>
  );
}
