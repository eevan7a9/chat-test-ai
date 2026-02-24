"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/Chat";
import { Bot, User } from "lucide-react";

export type ChatMessagesProps = {
  messages: ChatMessage[];
  className?: string;
};

export default function ChatMessages({
  messages,
  className,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card
      className={cn(
        "flex h-full w-full flex-col rounded-none border-none bg-slate-50 shadow-sm",
        className,
      )}
    >
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={cn(
                "flex w-full items-end gap-3",
                isUser ? "justify-end" : "justify-start",
              )}
            >
              {!isUser && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback className="bg-black">
                    <Bot className="h-5 w-5 text-white" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={cn(
                  "max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed wrap-break-word",
                  isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground border",
                )}
              >
                {message.content}
              </div>

              {isUser && (
                <Avatar className="h-8 w-8 border border-primary">
                  <AvatarFallback className="bg-primary/10">
                    <User className="h-5 w-5 text-black" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          );
        })}
        <div ref={bottomRef} />
      </CardContent>
    </Card>
  );
}
