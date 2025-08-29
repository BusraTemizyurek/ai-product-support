import { CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

export const ChatHeader = () => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <MessageCircle className="h-5 w-5" />
        Chat with Manual Assistant
      </CardTitle>
    </CardHeader>
  );
};
