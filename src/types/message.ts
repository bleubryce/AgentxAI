
export interface MessageType {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  agentId?: string;
}
