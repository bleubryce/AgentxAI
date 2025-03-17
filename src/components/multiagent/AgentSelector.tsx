
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvailableAgent } from "@/types/agent";

interface AgentSelectorProps {
  selectedAgent: AvailableAgent;
  onAgentChange: (agent: AvailableAgent) => void;
}

// Available agents for the demo
const availableAgents: AvailableAgent[] = [
  {
    id: "auto-gpt",
    name: "AutoGPT",
    description: "A versatile agent that can perform various tasks",
    capabilities: ["web-search", "code-generation", "conversation"],
    model: "gpt-4o",
    emoji: "🤖",
  },
  {
    id: "baby-agi",
    name: "BabyAGI",
    description: "Task-driven autonomous agent",
    capabilities: ["task-decomposition", "planning", "execution"],
    model: "gpt-4o",
    emoji: "👶",
  },
  {
    id: "agent-gpt",
    name: "AgentGPT",
    description: "Autonomous AI agent system",
    capabilities: ["autonomous-execution", "feedback-loop", "memory"],
    model: "gpt-4o",
    emoji: "🧠",
  },
  {
    id: "research-agent",
    name: "Research Agent",
    description: "Specialized in researching and answering complex questions",
    capabilities: ["information-retrieval", "synthesis", "citation"],
    model: "gpt-4o-mini",
    emoji: "🔍",
  },
];

export const AgentSelector = ({ selectedAgent, onAgentChange }: AgentSelectorProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium">Select AI Agent:</label>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="flex items-center justify-between w-full p-3 rounded-md border bg-background">
          <div className="flex items-center gap-2">
            <span className="text-lg">{selectedAgent.emoji}</span>
            <span>{selectedAgent.name}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[240px]">
          {availableAgents.map((agent) => (
            <DropdownMenuItem
              key={agent.id}
              className={`flex items-center justify-between p-2 cursor-pointer ${
                selectedAgent.id === agent.id ? "bg-accent" : ""
              }`}
              onClick={() => {
                onAgentChange(agent);
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{agent.emoji}</span>
                <div className="flex flex-col">
                  <span className="font-medium">{agent.name}</span>
                  <span className="text-xs text-muted-foreground">{agent.model}</span>
                </div>
              </div>
              {selectedAgent.id === agent.id && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      
      <div className="text-xs text-muted-foreground">
        <p>{selectedAgent.description}</p>
        <div className="flex flex-wrap gap-1 mt-1">
          {selectedAgent.capabilities.map((capability) => (
            <span 
              key={capability} 
              className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px]"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
