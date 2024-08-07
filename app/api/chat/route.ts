import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { semanticCacheA, semanticCacheB } from "@/lib/semantic-cache";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { query, cacheType = "A" } = await req.json();
  // let's save the namespace inside the key to know which cache was used
  const semanticCache = cacheType === "B" ? semanticCacheB : semanticCacheA;
  const cachePrefix = cacheType === "B" ? "SemanticCacheB:" : "SemanticCacheA:";

  const result = await semanticCache.get(cachePrefix + query);

  console.log(result);

  if (result) {
    return new Response(
      JSON.stringify({
        title: query,
        description: result,
        cacheUsed: `semanticCache${cacheType}`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt: query,
  });

  // setting a cache prefix here to know
  await semanticCache.set(cachePrefix + query, text);

  return new Response(
    JSON.stringify({
      title: query,
      description: text,
      cacheUsed: `semanticCache${cacheType}`,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
