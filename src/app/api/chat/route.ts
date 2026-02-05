import { google } from "@ai-sdk/google";
import { streamText, convertToModelMessages, UIMessage } from "ai";
import { PERSONAL_CONTEXT } from "@/const/personal-context";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const safeMessages = Array.isArray(messages) ? messages : [];

  const result = await streamText({
    model: google("gemini-1.5-flash"),
    system: PERSONAL_CONTEXT,
    messages: await convertToModelMessages(safeMessages as UIMessage[]),
  });

  return result.toTextStreamResponse();
}
