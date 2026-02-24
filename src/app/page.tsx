import ChatContainer from "@/components/chat/chat-container";

const apiToken = process.env.OPEN_API_TOKEN;
export default function Home() {
  return (
    <div className="h-full grow flex flex-col relative">
      {apiToken ? null : (
        <div className="bg-red-300/40 text-red-800 p-4 text-center absolute top-0 w-full z-50">
          Please set your OpenAI API token in the .env.local file.
        </div>
      )}

      <div className="w-full flex flex-col grow max-w-4xl mx-auto sm:py-8">
        <ChatContainer className="mt-auto mb-0 grow" />
      </div>
    </div>
  );
}
