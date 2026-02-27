import ChatContainer from "@/components/chat/chat-container";

const openAI = process.env.OPEN_API_TOKEN;
const geminiApiKey = process.env.GEMINI_API_KEY;

export default function Home() {
  const missingKeys = !openAI || !geminiApiKey;
  return (
    <div className="h-full grow flex flex-col relative">
      {missingKeys ? null : (
        <div className="bg-red-300/40 text-red-800 p-4 text-center absolute top-0 w-full z-50">
          Please set your OpenAI or Gemini API key in the .env.local file.
        </div>
      )}

      <div className="w-full flex flex-col grow max-w-4xl mx-auto sm:py-8">
        <ChatContainer className="mt-auto mb-0 grow" />
      </div>
    </div>
  );
}
