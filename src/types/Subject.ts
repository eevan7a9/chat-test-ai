import React from "react";

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode; // You can use a React component or an image URL for the icon
  firstMessage?: string; // Optional: A default message to start the conversation with this tutor
  context?: string; // Optional: Additional context or information about the subject
}
