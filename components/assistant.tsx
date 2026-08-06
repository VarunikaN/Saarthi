"use client";

import { FormEvent, useState } from "react";

type Citation = { title: string; url: string; domain: string; effectiveDate: string };
type Answer = { answer: string; citations: Citation[]; status: "grounded" | "insufficient" };

const prompts = [
  "Where can I find official scholarship applications?",
  "How do I verify whether I can use PM-JAY services?",
  "Where can I search official government schemes?",
  "Where can I find EPFO member services?",
  "Where can I update Aadhaar information?",
  "Where can I check food-security programme resources?",
];

export function Assistant() {
  const [question, setQuestion] = useState(prompts[0]);
  const [result, setResult] = useState<Answer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/ask", {
        body: JSON.stringify({ question }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error ?? "The request could not be completed.");
      setResult(payload);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The request could not be completed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="workspace" aria-labelledby="ask-title">
      <div className="workspace-copy">
        <div className="eyebrow">Ask with evidence</div>
        <h2 id="ask-title">Start from the source.</h2>
        <p>Every response is limited to the visible corpus. If the evidence is missing, Saarthi says so.</p>
        <div className="prompt-list">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => setQuestion(prompt)} type="button">{prompt}</button>
          ))}
        </div>
      </div>
      <div className="answer-panel">
        <form onSubmit={submit}>
          <label htmlFor="question">Your question</label>
          <textarea id="question" maxLength={800} onChange={(event) => setQuestion(event.target.value)} value={question} />
          <button className="submit" disabled={loading} type="submit">{loading ? "Checking sources" : "Search official sources"}</button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
        {result && (
          <div className="result" aria-live="polite">
            <div className={`status ${result.status}`}>{result.status === "grounded" ? "Source-grounded response" : "Evidence not sufficient"}</div>
            <p>{result.answer}</p>
            {result.citations.length > 0 && (
              <div className="citations">
                <span>Sources consulted</span>
                {result.citations.map((citation) => (
                  <a href={citation.url} key={citation.url} rel="noreferrer" target="_blank">
                    <strong>{citation.title}</strong>
                    <small>{citation.domain} · reviewed {citation.effectiveDate}</small>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
