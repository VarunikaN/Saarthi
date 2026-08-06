import { Assistant } from "@/components/assistant";
import { sources } from "@/lib/sources";

export default function Page() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">Saarthi / verified-source navigator</div>
        <h1>Find the official path, not a confident guess.</h1>
        <p className="lede">
          A citation-grounded assistant for Indian student scholarships, public-benefit schemes, and health-insurance navigation.
        </p>
        <div className="guardrails">
          <span>Official sources only</span>
          <span>Citations required</span>
          <span>No eligibility decisions</span>
        </div>
      </section>

      <Assistant />

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
    </main>
  );
}
