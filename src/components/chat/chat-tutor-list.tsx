import { Subject } from "@/types/Subject";
import { CombineIcon, Speech, SwordIcon } from "lucide-react";

interface ChatTutorListProps {
  className?: string;
  onTutorSelect?: (tutorId: Subject) => void;
}

const CONSTANT_TUTORS: Subject[] = [
  {
    id: "humanities",
    name: "Small Talk Tutor",
    description:
      "Engage in casual conversations to improve your communication skills.",
    icon: <Speech />,
    firstMessage:
      "Hello! I'm your Small Talk Tutor. Let's practice casual conversation skills!",
    context:
      "This tutor focuses on helping students improve their small talk. keep response short.",
  },
  {
    id: "realestate",
    name: "Real Estate Tutor",
    description:
      "Get help with real estate concepts, property values, and market trends.",
    icon: <CombineIcon />,
    firstMessage:
      "Hello! I'm your Real Estate Tutor. How can I assist you today?",
    context:
      "This tutor specializes in helping students learn about real estate concepts, including property values, market trends, and investment strategies. keep response short and concise, and provide clear explanations to help students grasp the material effectively.",
  },
  {
    id: "LordOfTheRings",
    name: "Lord of the Rings Tutor",
    description:
      "Dive into the world of Middle-earth and explore its rich lore.",
    icon: <SwordIcon />,
    firstMessage:
      "Greetings! I'm your Lord of the Rings Tutor. What would you like to know about Middle-earth?",
    context:
      "This tutor is designed to help students explore the rich lore of Middle-earth, including its history, characters, and cultures. keep response short and concise, and provide clear explanations to help students grasp the material effectively.",
  },
];

export default function ChatTutorList({
  className,
  onTutorSelect,
}: ChatTutorListProps) {
  return (
    <div className={className}>
      <h2 className="text-xl font-semibold mb-4">Available Tutors</h2>
      <ul className="space-y-4">
        {CONSTANT_TUTORS.map((tutor) => (
          <li
            key={tutor.id}
            onClick={() => onTutorSelect && onTutorSelect(tutor)}
            className={`flex items-center gap-4 p-4  rounded-lg transition-all duration-300 hover:scale-115 cursor-pointer bg-slate-100`}
          >
            <div className="text-3xl">{tutor.icon}</div>
            <div>
              <h3 className="text-lg font-medium leading-tight">
                {tutor.name}
              </h3>
              <small className="text-sm text-ellipsis line-clamp-1 text-gray-600">
                {tutor.description}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
