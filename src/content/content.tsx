"use client";

import { ContentHead } from "./content-head";
import { Chat } from "@/chat/chat";
// import dynamic from "next/dynamic";
// const PdfPreview = dynamic(() => import("./pdf-preview"), { ssr: false });

export const Content = () => {
  return (
    <div className="flex flex-col flex-1 bg-gray-300 p-4 overflow-hidden">
      <ContentHead />
      <div className="flex flex-row flex-1 bg-gray-300 p-4 overflow-hidden gap-4">
        {/* <PdfPreview /> */}
        <Chat />
      </div>
    </div>
  );
};
