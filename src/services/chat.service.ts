import { ChatMessage } from "@/types/Chat";

class ChatService {
  async getResponse(messages: ChatMessage[], context?: string) {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, context }),
    });

    const data = await res.json();
    return data.content;
  }
}

export const chatService = new ChatService();
