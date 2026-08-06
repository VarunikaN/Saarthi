import { Source, sources } from "@/lib/sources";

const stopWords = new Set(["a", "an", "and", "are", "for", "how", "i", "in", "is", "of", "or", "the", "to", "what", "where"]);

function terms(value: string) {
  return value.toLowerCase().match(/[a-z0-9-]+/g)?.filter((term) => !stopWords.has(term)) ?? [];
}

export function retrieve(question: string, limit = 3): Source[] {
  const queryTerms = terms(question);
  return sources
    .map((source) => ({ source, score: terms(`${source.title} ${source.domain} ${source.text}`).filter((term) => queryTerms.includes(term)).length }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map(({ source }) => source);
}
