
import { MessageType } from "@/types/message";
import { AvailableAgent } from "@/types/agent";
import { formatDistanceToNow } from "date-fns";

interface ChatWindowProps {
  messages: MessageType[];
  selectedAgent: AvailableAgent;
}

export const ChatWindow = ({ messages, selectedAgent }: ChatWindowProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              message.isUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            {!message.isUser && message.agentId && (
              <div className="flex items-center gap-1 mb-1 text-xs font-medium">
                <span>
                  {availableAgents.find(a => a.id === message.agentId)?.emoji || "🤖"}
                </span>
                <span>
                  {availableAgents.find(a => a.id === message.agentId)?.name || "AI Agent"}
                </span>
              </div>
            )}
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div className="text-xs opacity-70 mt-1 text-right">
              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
            </div>
          </div>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground text-center">
            No messages yet. Start a conversation with {selectedAgent.name}!
          </div>
        </div>
      )}
    </div>
  );
};

// Helper data for rendering agent names/emojis
const availableAgents = [
  {
    id: "auto-gpt",
    name: "AutoGPT",
    emoji: "🤖",
  },
  {
    id: "baby-agi",
    name: "BabyAGI",
    emoji: "👶",
  },
  {
    id: "agent-gpt",
    name: "AgentGPT",
    emoji: "🧠",
  },
  {
    id: "research-agent",
    name: "Research Agent",
    emoji: "🔍",
  },
];
