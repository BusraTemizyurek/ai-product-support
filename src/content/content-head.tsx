import { FileText } from "lucide-react";

export const ContentHead = () => {
  return (
    <div className="text-center mb-4">
      <div className="flex items-center justify-center gap-1 mb-2">
        <FileText className="h-8 w-8 text-blue-600" />
        <h1 className="text-xl font-bold text-gray-900">
          Product Manual Assistant
        </h1>
      </div>
      <p className="text-gray-600">
        Ask me anything about your product using the manual information
      </p>
    </div>
  );
};
