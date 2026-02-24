import { ChatMessage } from "./Chat";

export interface Room {
  messages: ChatMessage[];
  tutor: string;
  summary?: string;
}
