"use client";

import { Card } from "@/components/ui/card";
import { ChatHeader } from "./chat-header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChatContext } from "./chat-context";
import { Send } from "lucide-react";
import { ChatContent } from "./chat-content";

export const Chat = () => {
  const { status, setStatus, setMessages } = useChatContext();
  const [input, setInput] = useState("");

  const onSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: input,
        },
      ]);

      setStatus("streaming");
      setInput("");
    }
  };

  return (
    <Card className="flex flex-1 flex-col justify-between">
      <ChatHeader />
      <ChatContent />

      <CardFooter>
        <form onSubmit={onSubmitButton} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the product manual..."
            className="flex-1"
          />
          <Button type="submit" disabled={status === "streaming"}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
