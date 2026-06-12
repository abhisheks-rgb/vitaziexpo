import { Feather, Ionicons } from '@expo/vector-icons';
import { TextInput, TouchableOpacity, View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import AppText from '../../../../components/AppText';
import { AppImages } from '../../../../constants';
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
          <AppText style={styles.importedReportIcon}>📋</AppText>
          <AppText style={styles.importedReportText} numberOfLines={1}>
            {importedReport.clinicName} — {importedReport.date}
          </AppText>
          <TouchableOpacity
            onPress={onClearReport}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <AppText style={styles.importedReportClose}>✕</AppText>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputRow}>
        <TouchableOpacity onPress={() => onAttachPress('import_report')} activeOpacity={0.7}>
          <Feather style={styles.uploadIcon} name="file-text" size={20} />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder="Ask me anything..."
          placeholderTextColor={theme.colors.textSecondary}
          multiline
          returnKeyType="send"
          onSubmitEditing={onSend}
        />

        <TouchableOpacity onPress={() => onAttachPress('choose_files')} activeOpacity={0.7}>
          <Ionicons style={styles.uploadIcon} name="cloud-upload-outline" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sendBtn, !hasText && styles.sendBtnDisabled]}
          onPress={onSend}
          disabled={!hasText}
          activeOpacity={0.85}
        >
          <AppImage
            source={AppImages.chatSendButton}
            containerStyle={styles.sendIcon}
            contentFit="contain"
            showLoader={false}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
