// File: AIAssistant/components/ChatBubble/ChatBubble.tsx

import { Text, View } from 'react-native';

import { useTheme } from '../../../../theme';
import type { ChatMessage } from '../../types/aiAssistant.types';

import { createStyles } from './styles';

interface Props {
  message: ChatMessage;
  showDateSeparator?: boolean;
}

export default function ChatBubble({ message, showDateSeparator }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const isUser = message.role === 'user';

  return (
    <>
      {showDateSeparator && (
        <View style={styles.dateSeparatorWrap}>
          <Text style={styles.dateSeparatorText}>{message.timestamp}</Text>
        </View>
      )}
      {isUser ? (
        <View style={styles.rowUser}>
          <View style={styles.bubbleUser}>
            <Text style={styles.textUser}>{message.content}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.rowAssistant}>
          <View style={styles.robotIconWrap}>
            <Text style={styles.robotIcon}>🤖</Text>
          </View>
          <View style={styles.bubbleAssistant}>
            <Text style={styles.textAssistant}>{message.content}</Text>
          </View>
        </View>
      )}
    </>
  );
}
