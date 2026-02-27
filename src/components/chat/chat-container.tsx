"use client";

import { toast } from "sonner";
import ChatTutorList from "./chat-tutor-list";
import { ChatMessage } from "@/types/Chat";
import ChatMessages from "./chat-messages";
import { useEffect, useEffectEvent, useState } from "react";
import { Subject } from "@/types/Subject";
import ChatInput from "./chat-input";
import ChatHeader from "./chat-header";
import { storage } from "@/lib/storage";
import { Room } from "@/types/Room";
import { chatService } from "@/services/chat.service";
import { Spinner } from "../ui/spinner";

export const mockMessages: ChatMessage[] = [];

export default function ChatContainer({ className }: { className?: string }) {
  const [selectedTutor, setSelectedTutor] = useState<Subject | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [isSending, setIsSending] = useState(false);

  async function handleSendMessage(message: string) {
    if (isSending) return;
    setIsSending(true);

    const newMessage: ChatMessage = {
      id: (messages.length + 1).toString(),
      role: "user",
      content: message,
      createdAt: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);

    try {
      const aiContent = await chatService.getResponse(
        [...messages, newMessage],
        selectedTutor?.context ||
          "You are a helpful tutor. Please provide concise and clear answers to the user's questions.",
      );
      console.log("AI Response:", aiContent);

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: aiContent,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      toast.success("This is a success message!", {
        dismissible: true,
        duration: 5000,
      });
    } catch (error) {
      toast.error("Failed to get response from the tutor. Please try again.");
      console.error("Error fetching AI response:", error);
    } finally {
      setIsSending(false);
    }
  }

  const onMessagesChange = useEffectEvent((newMessages: ChatMessage[]) => {
    if (!selectedTutor) return;

    storage.set(selectedTutor.id, {
      messages: newMessages.map((m) => ({
        ...m,
        createdAt:
          m.createdAt instanceof Date
            ? m.createdAt.toISOString()
            : new Date(m.createdAt || ""),
      })),
    });
  });

  const onSetTutor = useEffectEvent((tutor: Subject) => {
    const storedRoom = storage.get<Room>(tutor.id);

    if (storedRoom && storedRoom.messages.length > 0) {
      setMessages(storedRoom.messages);
      return;
    }

    const greetingMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: tutor.firstMessage || "Please select a tutor to start chatting.",
      createdAt: new Date(),
    };

    setMessages([greetingMessage]);
    storage.set(tutor.id, {
      tutor: tutor.id,
      messages: [greetingMessage],
    });
  });

  useEffect(() => {
    if (!selectedTutor) return;
    onSetTutor(selectedTutor);
  }, [selectedTutor]);

  useEffect(() => {
    onMessagesChange(messages);
  }, [messages]);

  return (
    <div
      className={`grow bg-white rounded-lg border grid grid-cols-8 ${className || ""}`}
    >
      <section className="col-span-2 border-r">
        <ChatTutorList className="px-3 pt-4" onTutorSelect={setSelectedTutor} />
      </section>

      <section
        className={`relative col-span-6 grow flex flex-col overflow-hidden`}
      >
        <ChatHeader selectedTutor={selectedTutor} className="border-b" />

        <div className="grow bg-slate-50 w-full">
          {selectedTutor ? (
            <>
              {/* Chat messages will go here */}
              <ChatMessages messages={messages} className="h-full" />
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">
                Please select a tutor to start chatting.
              </p>
            </div>
          )}
        </div>

        {isSending && (
          <div className="grow flex justify-center items-center z-50 absolute inset-0 bg-white/75">
            <p className="flex items-center p-4 text-center text-sm text-gray-500">
              <Spinner /> Loading response...
            </p>
          </div>
        )}

        <ChatInput
          disabled={!selectedTutor || isSending}
          onSendMessage={handleSendMessage}
          lastMessage={messages[messages.length - 1]?.content}
        />
      </section>
    </div>
  );
}
