// File: AIAssistant/types/aiAssistant.types.ts

export type MessageRole = 'user' | 'assistant';
export type AttachmentSheetType = 'import_report' | 'choose_files' | null;

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  imageSource?: any;
}

export interface ReportOption {
  id: string;
  clinicName: string;
  date: string;
}

export interface PhotoOption {
  id: string;
  source: any;
}

export interface ChatSession {
  id: string;
  clinicName: string;
  date: string;
  lastMessage: string;
  lastImageSource?: any;
}
