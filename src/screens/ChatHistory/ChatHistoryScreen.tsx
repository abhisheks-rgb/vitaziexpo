import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getChatSessions } from '../../application/chat/getChat';
import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import SmartList, { SmartListTogglePlacement } from '../../components/SmartList/SmartList';
import { AppImages } from '../../constants';
import type { ChatSession } from '../../domain/Chat/models/chat';
import type { AppStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme';

import { createStyles } from './styles';

type Props = NativeStackScreenProps<AppStackParamList, 'ChatHistory'>;

export default function ChatHistoryScreen({ navigation }: Props) {
  const theme = useTheme();
  const styles = createStyles(theme);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);

  // Initial fetch
  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await getChatSessions(null);
      setSessions(result.data);
      setNextCursor(result.nextCursor);
      setHasMore(result.nextCursor !== null);
    } catch (e: any) {
      console.error(e.message ?? 'Failed to load chat history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load more (pagination)
  const loadMore = useCallback(async () => {
    if (!nextCursor) return;
    try {
      const result = await getChatSessions(nextCursor);
      setSessions((prev) => [...prev, ...result.data]);
      setNextCursor(result.nextCursor);
      setHasMore(result.nextCursor !== null);
    } catch (e: any) {
      console.error(e.message ?? 'Failed to load more sessions');
    }
  }, [nextCursor]);

  useEffect(() => {
    fetchSessions();
  }, []);

  // Tick marks for outgoing user/doctor messages
  const renderTicks = (session: ChatSession) => {
    if (session.lastMessageRole === 'assistant') return null;
    const filled = session.lastMessageStatus === 'read';
    const double =
      session.lastMessageStatus === 'delivered' || session.lastMessageStatus === 'read';
    const color = filled ? theme.colors.primary : theme.colors.textSecondary;
    return <Text style={{ color, fontSize: 12, marginRight: 2 }}>{double ? '✓✓' : '✓'}</Text>;
  };

  const renderSessionItem = (item: ChatSession) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => navigation.navigate('AIAssistant', { chatId: item.id })}
      activeOpacity={0.75}
    >
      <View style={styles.iconWrap}>
        {item.avatarSource ? (
          <AppImage
            source={{ uri: item.avatarSource }}
            containerStyle={styles.iconWrap}
            contentFit="cover"
            showLoader={false}
          />
        ) : (
          <Text style={styles.iconText}>🏥</Text>
        )}
      </View>

      <View style={styles.rowInfo}>
        <Text style={styles.clinic}>{item.doctorName ?? item.clinicName}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          {renderTicks(item)}
          <Text
            style={[styles.lastMessage, item.unreadCount > 0 && styles.lastMessageUnread]}
            numberOfLines={1}
          >
            {item.lastMessage || 'No messages yet'}
          </Text>
        </View>
      </View>

      <View style={styles.rowRight}>
        {item.lastImageSource && (
          <View style={styles.thumbnail}>
            <AppImage
              source={{ uri: item.lastImageSource }}
              containerStyle={{ width: 44, height: 44 }}
              contentFit="cover"
              showLoader={false}
            />
          </View>
        )}
        <Text style={styles.date}>{item.lastMessageDisplay}</Text>
        {item.unreadCount > 0 && (
          <View style={[styles.badge, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.badgeText}>{item.unreadCount > 99 ? '99+' : item.unreadCount}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const EmptyChatHistory = (
    <View style={styles.emptyContainer}>
      <AppImage source={AppImages.noChat} containerStyle={styles.emptyImage} contentFit="contain" />
      <Text style={styles.emptyTitle}>No Conversations Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start a chat with the AI Assistant to ask questions about your retinal health, reports, and
        screenings.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />
      <AppHeader
        title="Chat History"
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <SmartList
        data={sessions}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderSessionItem(item)}
        isLoading={isLoading}
        onRefresh={fetchSessions}
        onLoadMore={loadMore}
        hasMore={hasMore}
        numColumns={1}
        listPadding={16}
        togglePlacement={SmartListTogglePlacement.None}
        EmptyComponent={EmptyChatHistory}
      />
    </SafeAreaView>
  );
}
