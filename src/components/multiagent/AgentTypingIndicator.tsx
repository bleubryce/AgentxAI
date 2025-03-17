
import { AvailableAgent } from "@/types/agent";

interface AgentTypingIndicatorProps {
  agent: AvailableAgent;
}

export const AgentTypingIndicator = ({ agent }: AgentTypingIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{agent.emoji}</span>
      <span>{agent.name} is typing</span>
      <span className="flex">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
      </span>
    </div>
  );
};
