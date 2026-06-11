// File: AIAssistant/hooks/useAIAssistant.ts

import { useRef, useState } from 'react';
import type { FlatList } from 'react-native';

import { INITIAL_MESSAGES_MOCK } from '../data/aiAssistant.mock';
import type { AttachmentSheetType, ChatMessage, ReportOption } from '../types/aiAssistant.types';

export function useAIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES_MOCK);
  const [inputText, setInputText] = useState('');
  const [attachmentSheet, setAttachmentSheet] = useState<AttachmentSheetType>(null);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);
  const [importedReport, setImportedReport] = useState<ReportOption | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const listRef = useRef<FlatList>(null);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const toggleReportSelection = (id: string) => {
    setSelectedReports((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );
  };

  const confirmReportImport = (report: ReportOption) => {
    setImportedReport(report);
    setAttachmentSheet(null);
    setSelectedReports([]);
  };

  const clearImportedReport = () => setImportedReport(null);

  return {
    messages,
    inputText,
    setInputText,
    attachmentSheet,
    setAttachmentSheet,
    selectedReports,
    toggleReportSelection,
    confirmReportImport,
    importedReport,
    clearImportedReport,
    showHistory,
    setShowHistory,
    listRef,
    sendMessage,
  };
}
