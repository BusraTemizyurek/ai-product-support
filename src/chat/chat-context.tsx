"use client";

import { ChatCompletion } from "@azure/openai/types";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

export interface Message {
  role: "user" | "assistant";
  content: string;
}

type ChatContextType = {
  status: "streaming" | "ready";
  setStatus: React.Dispatch<React.SetStateAction<"streaming" | "ready">>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

type ChatProviderProps = {
  children: ReactNode;
};

const sendMessage = async (messages: Message[]): Promise<ChatCompletion> => {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(messages),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [status, setStatus] = useState<"streaming" | "ready">("ready");

  useEffect(() => {
    if (
      messages.length == 0 ||
      messages[messages.length - 1].role === "assistant"
    ) {
      return;
    }

    sendMessage(messages).then((response) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.choices[0].message.content ?? "",
        },
      ]);

      setStatus("ready");
    });
  }, [messages]);

  const value = {
    status,
    setStatus,
    messages,
    setMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
