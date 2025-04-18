
import { useState, useRef, useEffect } from "react";
import { AgentSelector } from "./AgentSelector";
import { ChatWindow } from "./ChatWindow";
import { AgentTypingIndicator } from "./AgentTypingIndicator";
import { AvailableAgent } from "@/types/agent";
import { MessageType } from "@/types/message";
import { useToast } from "@/hooks/use-toast";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const MESSAGES_PER_PAGE = 10;

export const AgentChatInterface = () => {
  const [selectedAgent, setSelectedAgent] = useState<AvailableAgent>({
    id: "auto-gpt",
    name: "AutoGPT",
    description: "A versatile agent that can perform various tasks",
    capabilities: ["web-search", "code-generation", "conversation"],
    model: "gpt-4o",
    emoji: "🤖",
  });
  
  const [allMessages, setAllMessages] = useState<MessageType[]>([
    {
      id: "welcome",
      content: `Hi there! I'm ${selectedAgent.name} (${selectedAgent.emoji}). How can I assist you today?`,
      isUser: false,
      timestamp: new Date(),
      agentId: selectedAgent.id,
    },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Calculate pagination
  const totalPages = Math.ceil(allMessages.length / MESSAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
  const endIndex = startIndex + MESSAGES_PER_PAGE;
  const visibleMessages = allMessages.slice(startIndex, endIndex);

  const handleAgentChange = (agent: AvailableAgent) => {
    setSelectedAgent(agent);
    const newMessage = {
      id: `agent-change-${Date.now()}`,
      content: `You are now chatting with ${agent.name} (${agent.emoji}). How can I help you?`,
      isUser: false,
      timestamp: new Date(),
      agentId: agent.id,
    };
    
    setAllMessages(prev => [...prev, newMessage]);
    setCurrentPage(Math.ceil((allMessages.length + 1) / MESSAGES_PER_PAGE));
    
    toast({
      title: "Agent Changed",
      description: `You are now chatting with ${agent.name}`,
    });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Create a new message object for the user message
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };
    
    // Add user message to the chat
    setAllMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    
    // Move to the last page when sending a new message
    setTimeout(() => {
      setCurrentPage(Math.ceil((allMessages.length + 1) / MESSAGES_PER_PAGE));
    }, 0);
    
    // Start typing indicator
    setIsTyping(true);
    
    // Simulate agent response delay (would be replaced with actual API call)
    setTimeout(() => {
      // Create agent response
      const agentResponse: MessageType = {
        id: `agent-${Date.now()}`,
        content: generateDemoResponse(inputMessage, selectedAgent),
        isUser: false,
        timestamp: new Date(),
        agentId: selectedAgent.id,
      };
      
      setAllMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
      
      // Move to the last page after agent responds
      setCurrentPage(Math.ceil((allMessages.length + 2) / MESSAGES_PER_PAGE));
    }, 1500 + Math.random() * 1500); // Random delay between 1.5-3s
  };

  // Demo function to generate mock responses based on agent type
  const generateDemoResponse = (userInput: string, agent: AvailableAgent): string => {
    const lowerCaseInput = userInput.toLowerCase();
    
    // Generic responses based on agent type
    switch (agent.id) {
      case "auto-gpt":
        if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
          return "Hello! I'm AutoGPT, a versatile AI agent. I can help with a wide range of tasks. What would you like assistance with?";
        } else if (lowerCaseInput.includes("code") || lowerCaseInput.includes("programming")) {
          return "I can help with coding tasks. What language or framework are you working with?";
        } else {
          return "I understand your request. In a fully implemented system, I would process this through the AutoGPT framework to generate a comprehensive response.";
        }
      
      case "baby-agi":
        return "As BabyAGI, I focus on task management and execution. I'd break down your request into actionable steps, then execute them one by one. This is a demo, but in a full implementation, I would work through your request methodically.";
      
      case "agent-gpt":
        return "I specialize in autonomous task execution. For your request, I would begin by understanding the goal, then develop a plan and execute it. In a full implementation, I would work through multiple iterations to refine the answer.";
      
      case "research-agent":
        return "I'm designed to conduct in-depth research on your query. I would search for relevant information, analyze it, and provide a comprehensive summary. In a full implementation, I would provide citations and sources.";
      
      default:
        return "I've received your message and would typically process it with advanced AI capabilities. This is a demo interface - integration with backend AI services would provide more sophisticated responses.";
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Build pagination UI
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <Pagination className="my-2">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }} 
              />
            </PaginationItem>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink 
                href="#" 
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }} 
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="flex flex-col h-[70vh] md:h-[80vh] border rounded-lg shadow-md overflow-hidden bg-card">
      <div className="p-4 border-b bg-muted/30">
        <AgentSelector 
          selectedAgent={selectedAgent} 
          onAgentChange={handleAgentChange} 
        />
      </div>
      
      <ChatWindow 
        messages={visibleMessages} 
        selectedAgent={selectedAgent} 
      />
      
      {renderPagination()}
      
      <div className="p-4 border-t mt-auto">
        {isTyping && <AgentTypingIndicator agent={selectedAgent} />}
        
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message here..."
            className="flex-1 p-3 rounded-md border bg-background"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim()}
            className="p-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
      <div ref={bottomRef} />
    </div>
  );
};
