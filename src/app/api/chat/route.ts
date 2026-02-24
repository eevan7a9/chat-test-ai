import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = process.env.OPEN_API_TOKEN
  ? new OpenAI({
      apiKey: process.env.OPEN_API_TOKEN!,
    })
  : new OpenAI({
      apiKey: process.env.GEMINI_API_KEY!, // Gemini key
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

export async function POST(req: Request) {
  const { messages, context } = await req.json();

  const formattedMessages: ChatCompletionMessageParam[] = [
    ...(context
      ? [
          {
            role: "system",
            content: context,
          },
        ]
      : []),
    ...messages,
  ];

  const completion = await openai.chat.completions.create({
    // model: "gpt-4.1", // "gpt-3.5-turbo",
    model: "gemini-2.5-flash",
    messages: formattedMessages,
  });

  return NextResponse.json({
    content: completion.choices[0].message.content,
  });
}
