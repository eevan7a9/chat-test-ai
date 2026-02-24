"use client";

import { Send } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

interface ChatInputProps {
  onSendMessage?: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      messageSent();
    }
  }

  function messageSent() {
    if (onSendMessage) {
      onSendMessage(message);
      setMessage("");
    }
  }

  return (
    <div className="relative bg-white p-3 border-t flex">
      <div className="w-full">
        <Textarea
          readOnly={disabled}
          placeholder="Type your message here... (500 max characters)"
          className="w-full resize-none border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={1}
          maxLength={500}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <Button
        disabled={disabled}
        className="absolute right-6 top-6"
        onClick={messageSent}
      >
        <Send />
      </Button>
    </div>
  );
}
