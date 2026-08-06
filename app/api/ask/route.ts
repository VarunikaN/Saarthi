import { answerQuestion } from "@/lib/answer";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const question = typeof body?.question === "string" ? body.question.trim() : "";

  if (!question || question.length > 800) {
    return Response.json({ error: "Ask one clear question of up to 800 characters." }, { status: 400 });
  }

  return Response.json(await answerQuestion(question));
}
