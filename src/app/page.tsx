import { Header } from "@/header/header";
import { Content } from "@/content/content";
import { Footer } from "@/footer/footer";
import { ChatProvider } from "@/chat/chat-context";

export default function Home() {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />
        <Content />
        <Footer />
      </div>
    </ChatProvider>
  );
}
