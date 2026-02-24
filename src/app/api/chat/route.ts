import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_TOKEN!,
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
    model: "gpt-4.1", // "gpt-3.5-turbo",
    messages: formattedMessages,
  });

  return NextResponse.json({
    content: completion.choices[0].message.content,
  });
}
