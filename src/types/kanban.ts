export type ConversationStatus = 'new' | 'ai-responding' | 'waiting-client' | 'complex' | 'urgent' | 'waiting' | 'resolved';

export type Sentiment = 'positive' | 'negative' | 'neutral';

export type AttendantType = 'ai' | 'human';

export interface Attendant {
  id: string;
  name: string;
  avatar?: string;
  type: AttendantType;
}

export interface Conversation {
  id: string;
  clientName: string;
  subject: string;
  date: string;
  status: ConversationStatus;
  messageCount: number;
  attendants: Attendant[];
  assignedTo?: string;
  timeElapsed?: string;
  sentiment?: Sentiment;
  isUrgent?: boolean;
  isHighPriority?: boolean;
}

export interface Column {
  id: string;
  title: string;
  count: number;
  conversations: Conversation[];
}

export interface Channel {
  id: string;
  name: string;
  isActive?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}
