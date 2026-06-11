// File: AIAssistant/components/ChatHistory/ChatHistoryScreen.tsx

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { AppImages } from '../../constants';
import type { AppStackParamList } from '../../navigation/types'; // adjust path to yours
import { useTheme } from '../../theme';
import { CHAT_HISTORY_MOCK } from '../AIAssistant/data/aiAssistant.mock';
import type { ChatSession } from '../AIAssistant/types/aiAssistant.types';

import { createStyles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ChatHistory'>;

export default function ChatHistoryScreen({ navigation }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const handleSelectSession = (session: ChatSession) => {
    navigation.navigate('AIAssistant', {
      chatId: session.id,
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />
      <AppHeader
        title="Chat History"
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        style={styles.list}
        contentContainerStyle={[
          styles.listContent,
          CHAT_HISTORY_MOCK.length === 0 && styles.emptyListContainer, // 👈 KEY
        ]}
        data={CHAT_HISTORY_MOCK}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<EmptyChatHistory />} // 👈 KEY
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.row}
            onPress={() => handleSelectSession(item)}
            activeOpacity={0.75}
          >
            <View style={styles.iconWrap}>
              <Text style={styles.iconText}>🏥</Text>
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.clinic}>{item.clinicName}</Text>
              <Text style={styles.date}>{item.date}</Text>

              {item.lastMessage ? (
                <Text style={styles.lastMessage} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              ) : null}
            </View>

            {item.lastImageSource && (
              <View style={styles.thumbnail}>
                <AppImage
                  source={item.lastImageSource}
                  containerStyle={{ width: 44, height: 44 }}
                  contentFit="cover"
                  showLoader={false}
                />
              </View>
            )}

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );

  function EmptyChatHistory() {
    return (
      <View style={styles.emptyContainer}>
        <AppImage
          source={AppImages.noChat} // or emptyHistory if you have one
          containerStyle={styles.emptyImage}
          contentFit="contain"
        />

        <Text style={styles.emptyTitle}>No Conversations Yet</Text>

        <Text style={styles.emptySubtitle}>
          Start a chat with the AI Assistant to ask questions about your retinal health, reports,
          and screenings.
        </Text>
      </View>
    );
  }
}
