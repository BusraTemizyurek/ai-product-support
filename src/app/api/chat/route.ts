import { AzureOpenAI } from "openai";
import "@azure/openai/types";
import type { Message } from "@/chat/chat-context";

export async function POST(req: Request): Promise<Response> {
  try {
    const messages = (await req.json()) as Message[];

    // Initialize Azure OpenAI client
    const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
    const apiKey = process.env["AZURE_OPENAI_API_KEY"];
    const apiVersion = "2025-01-01-preview";
    const deployment = "gpt-4.1-mini"; // "gpt-4.1-nano";
    const searchEndpoint = process.env["AZURE_SEARCH_ENDPOINT"];
    const searchApiKey = process.env["AZURE_SEARCH_API_KEY"];

    if (!endpoint || !apiKey) {
      return new Response("Azure OpenAI credentials not configured", {
        status: 500,
      });
    }

    if (!searchEndpoint || !searchApiKey) {
      return new Response("Azure Search credentials not configured", {
        status: 500,
      });
    }
    const client = new AzureOpenAI({
      endpoint,
      apiKey,
      apiVersion,
      deployment,
    });

    const incoming = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    // Convert messages to the format expected by Azure OpenAI
    const formattedMessages = [
      {
        role: "system" as const,
        content: "You are an AI assistant that helps people find information.",
      },
      ...incoming,
    ];

    // Create chat completion with Azure Search integration
    const result = await client.chat.completions.create({
      messages: formattedMessages,
      max_tokens: 13107,
      temperature: 0.7,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: null,
      model: deployment,
      data_sources: [
        {
          type: "azure_search",
          parameters: {
            endpoint: searchEndpoint,
            authentication: {
              type: "api_key",
              key: searchApiKey,
            },
            index_name: "pdf",
          },
        },
      ],
    });
    return new Response(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error in chat API:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
