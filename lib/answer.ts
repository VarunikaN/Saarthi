import "server-only";
import { generateGroundedAnswer, retrieveHosted, RetrievedSource } from "@/lib/hosted-retrieval";
import { retrieve } from "@/lib/retrieve";

function fallback(question: string, evidence: RetrievedSource[]) {
  const domains = [...new Set(evidence.map((source) => source.domain.toLowerCase()))].join(" and ");
  return `I found official material relevant to ${domains}. Review the cited source pages for current requirements, application windows, and verification steps. I cannot determine eligibility, confirm health coverage, or replace an authorised government channel for this question: ${question}`;
}

export async function answerQuestion(question: string) {
  const localEvidence: RetrievedSource[] = retrieve(question).map(({ domain, effectiveDate, text, title, url }) => ({ domain, effectiveDate, text, title, url }));
  let evidence = localEvidence;
  try {
    const hostedEvidence = await retrieveHosted(question);
    evidence = hostedEvidence && hostedEvidence.length > 0 ? hostedEvidence : localEvidence;
  } catch {
    evidence = localEvidence;
  }
  if (evidence.length === 0) {
    return {
      answer: "I do not have enough official material in this limited corpus to answer that safely. Try a question about scholarship applications, government-scheme discovery, or official PM-JAY verification channels.",
      citations: [],
      status: "insufficient" as const,
    };
  }

  let answer = fallback(question, evidence);
  try {
    answer = await generateGroundedAnswer(question, evidence) ?? answer;
  } catch {
    answer = fallback(question, evidence);
  }

  return {
    answer,
    citations: evidence.map(({ domain, effectiveDate, title, url }) => ({ domain, effectiveDate, title, url })),
    status: "grounded" as const,
  };
}
