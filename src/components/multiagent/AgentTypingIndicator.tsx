
import { AvailableAgent } from "@/types/agent";

interface AgentTypingIndicatorProps {
  agent: AvailableAgent;
}

export const AgentTypingIndicator = ({ agent }: AgentTypingIndicatorProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg bg-white/5 border border-white/5 animate-pulse-soft">
      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-bolt-blue/30 to-bolt-purple/30 flex items-center justify-center">
        {agent.emoji}
      </span>
      <span>{agent.name} is typing</span>
      <span className="flex">
        <span className="animate-bounce">.</span>
        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
      </span>
    </div>
  );
};
