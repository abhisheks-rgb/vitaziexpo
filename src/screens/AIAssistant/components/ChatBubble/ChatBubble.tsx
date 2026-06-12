import { View } from 'react-native';

import AppImage from '../../../../components/AppImage';
import AppText from '../../../../components/AppText';
import { AppImages } from '../../../../constants';
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
          <AppText style={styles.dateSeparatorText}>{message.timestamp}</AppText>
        </View>
      )}

      {isUser ? (
        <View style={styles.rowUser}>
          <View style={styles.bubbleUser}>
            <AppText style={styles.textUser}>{message.content}</AppText>
          </View>
        </View>
      ) : (
        <View style={styles.rowAssistant}>
          <View style={styles.robotIconWrap}>
            <AppImage
              source={AppImages.chatBubbleAi}
              containerStyle={{ width: 18 }}
              contentFit="contain"
              showLoader={false}
            />
          </View>
          <View style={styles.bubbleAssistant}>
            <AppText style={styles.textAssistant}>{message.content}</AppText>
          </View>
        </View>
      )}
    </>
  );
}
