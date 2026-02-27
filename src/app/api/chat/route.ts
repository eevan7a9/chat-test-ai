import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

const isOpenAI = Boolean(process.env.OPEN_API_TOKEN);

const openai = isOpenAI
  ? new OpenAI({
      apiKey: process.env.OPEN_API_TOKEN!,
    })
  : new OpenAI({
      apiKey: process.env.GEMINI_API_KEY!,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body?.messages || !Array.isArray(body.messages)) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 },
      );
    }
    const { messages, context } = body;

    const formattedMessages: ChatCompletionMessageParam[] = [
      ...(context ? [{ role: "system", content: context }] : []),
      ...messages,
    ];

    const completion = await openai.chat.completions.create({
      model: isOpenAI ? "gpt-4o" : "gemini-2.5-flash",
      messages: formattedMessages,
    });

    const content = completion?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: "Invalid AI response format" },
        { status: 400 },
      );
    }

    return NextResponse.json({ content });
  } catch (error: unknown) {
    console.error("Chat completion error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
