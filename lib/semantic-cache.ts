import { SemanticCache } from "@upstash/semantic-cache";
import { Index } from "@upstash/vector";

// 👇 your vector database
const index = new Index();

export const semanticCacheA = new SemanticCache({
  index,
  minProximity: 0.95,
  namespace: "semantic-cache-a",
});

// New semantic cache B
export const semanticCacheB = new SemanticCache({
  index,
  minProximity: 0.9,
  namespace: "semantic-cache-b",
});
