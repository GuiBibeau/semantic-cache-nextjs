import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { semanticCache } from "@/lib/semantic-cache";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { query } = await req.json();

  const result = await semanticCache.get(query);

  console.log(result);

  if (result) {
    return new Response(JSON.stringify({ title: query, description: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: query,
  });

  await semanticCache.set(query, text);

  return new Response(JSON.stringify({ title: query, description: text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
