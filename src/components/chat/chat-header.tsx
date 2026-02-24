import { Subject } from "@/types/Subject";

interface ChatHeaderProps {
  className?: string;
  selectedTutor: Subject | null;
}
export default function ChatHeader({
  className,
  selectedTutor,
}: ChatHeaderProps) {
  return (
    <div
      className={`py-2 sm:py-4 px-5 flex items-center gap-2 border-b ${className || ""}`}
    >
      Chatting with:{" "}
      <strong>
        {selectedTutor ? (
          <div className="flex items-center gap-1">
            {selectedTutor.icon}
            {selectedTutor.name}
          </div>
        ) : (
          "No tutor selected"
        )}
      </strong>
    </div>
  );
}
