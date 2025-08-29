"use client";

import { CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useChatContext } from "./chat-context";

export const ChatContent = () => {
  const { messages, status } = useChatContext();

  return (
    <CardContent
      className={`flex flex-col flex-1 h-[400px] overflow-y-auto ${
        messages.length === 0 ? "justify-center" : ""
      }`}
    >
      {messages.length === 0 ? (
        <div className="text-center text-gray-500">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">
            Welcome to your Product Manual Assistant!
          </h3>
          <p className="text-sm">
            Ask me any questions about your product and I&apos;ll help you find
            the answers from the manual.
          </p>
          <div className="mt-5 text-left max-w-md mx-auto">
            <p className="text-sm font-medium mb-2">Try asking:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>How do I set up the product?</li>
              <li>What are the safety instructions?</li>
              <li>How do I troubleshoot common issues?</li>
              <li>What&apos;s included in the package?</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case "text":
                        return (
                          <div key={`${message.id}-${i}`}>{part.text}</div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              </div>
            </div>
          ))}
          {status === "streaming" && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                  <span>Searching manual...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </CardContent>
  );
};
