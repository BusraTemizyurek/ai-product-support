import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";

const foundry = createOpenAI({
  baseURL: process.env.AZURE_FOUNDRY_BASE_URL, // .../models
  // Foundry wants `api-key` instead of Authorization; set a headers fn:
  headers: () => ({
    "api-key": process.env.AZURE_FOUNDRY_API_KEY!,
  }),
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    // pass the Foundry model id; SDK will include it in the payload

    model: foundry.chat(process.env.AZURE_FOUNDRY_MODEL_ID!),
    // Important: Foundry requires api-version in the query string; supply via baseURL or fetch hook:

    // easiest: append it in baseURL env: https://<resource>.services.ai.azure.com/models?api-version=2024-05-01-preview

    system: "You are a helpful assistant.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
