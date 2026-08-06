import { sources as corpus } from "@/lib/sources";

const openAiKey = process.env.OPENAI_API_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!openAiKey || !supabaseUrl || !supabaseKey) {
  throw new Error("OPENAI_API_KEY, SUPABASE_URL, and SUPABASE_SERVICE_ROLE_KEY are required.");
}

const credentials = { openAiKey, supabaseKey, supabaseUrl };

async function main() {
  const embeddingResponse = await fetch("https://api.openai.com/v1/embeddings", {
    body: JSON.stringify({ input: corpus.map((source) => source.text), model: "text-embedding-3-small" }),
    headers: { Authorization: `Bearer ${credentials.openAiKey}`, "Content-Type": "application/json" },
    method: "POST",
  });
  if (!embeddingResponse.ok) throw new Error("Embedding request failed.");
  const embedded = await embeddingResponse.json() as { data: Array<{ embedding: number[]; index: number }> };
  const rows = embedded.data.map(({ embedding, index }) => ({
    content: corpus[index].text,
    domain: corpus[index].domain,
    effective_date: corpus[index].effectiveDate,
    embedding,
    source_title: corpus[index].title,
    source_url: corpus[index].url,
  }));
  const insertResponse = await fetch(`${credentials.supabaseUrl}/rest/v1/source_chunks`, {
    body: JSON.stringify(rows),
    headers: { apikey: credentials.supabaseKey, Authorization: `Bearer ${credentials.supabaseKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    method: "POST",
  });
  if (!insertResponse.ok) throw new Error("Supabase insert failed.");
  console.log(`Ingested ${rows.length} official source chunks.`);
}

main();
