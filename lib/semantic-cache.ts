import { SemanticCache } from "@upstash/semantic-cache";
import { Index } from "@upstash/vector";

// 👇 your vector database
const index = new Index();

export const semanticCache = new SemanticCache({ index, minProximity: 0.95 });
