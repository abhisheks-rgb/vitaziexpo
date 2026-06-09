// File: AIAssistant/components/ChatInput/ChatInput.tsx

import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../theme';
import type { AttachmentSheetType, ReportOption } from '../../types/aiAssistant.types';
import { createStyles } from './styles';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSend: () => void;
  onAttachPress: (type: AttachmentSheetType) => void;
  importedReport: ReportOption | null;
  onClearReport: () => void;
}

export default function ChatInput({
  value,
  onChangeText,
  onSend,
  onAttachPress,
  importedReport,
  onClearReport,
}: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const hasText = value.trim().length > 0;

  return (
    <View style={styles.wrapper}>
      {importedReport && (
        <View style={styles.importedReportChip}>
          <Text style={styles.importedReportIcon}>📋</Text>
          <Text style={styles.importedReportText} numberOfLines={1}>
            {importedReport.clinicName} — {importedReport.date}
          </Text>
          <TouchableOpacity
            onPress={onClearReport}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.importedReportClose}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputRow}>
        <TouchableOpacity
          style={styles.attachBtn}
          onPress={() => onAttachPress('import_report')}
          activeOpacity={0.7}
        >
          <Text style={styles.attachIcon}>📎</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask me anything..."
          placeholderTextColor="#9CA3AF"
          multiline
          returnKeyType="send"
          onSubmitEditing={onSend}
        />

        <TouchableOpacity
          style={styles.micBtn}
          onPress={() => onAttachPress('choose_files')}
          activeOpacity={0.7}
        >
          <Text style={styles.micIcon}>🖼️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendBtn, !hasText && styles.sendBtnDisabled]}
          onPress={onSend}
          disabled={!hasText}
          activeOpacity={0.85}
        >
          <Text style={styles.sendIcon}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
