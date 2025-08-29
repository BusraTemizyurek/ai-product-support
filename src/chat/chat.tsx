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
  const { sendMessage } = useChatContext();
  const [input, setInput] = useState("");

  return (
    <Card className="flex flex-1 flex-col justify-between">
      <ChatHeader />
      <ChatContent />

      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (input.trim()) {
              sendMessage({ text: input });
              setInput("");
            }
          }}
          className="flex w-full gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about the product manual..."
            className="flex-1"
            //disabled={status !== "ready"}
          />
          <Button
            type="submit"
            //disabled={status !== "ready"}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};
