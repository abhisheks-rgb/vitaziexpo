import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { AppImages } from '../../constants';
import { useScrollStore } from '../../hooks/useScrollStore';
import { useTheme } from '../../theme';

import ChatBubble from './components/ChatBubble/ChatBubble';
import ChatInput from './components/ChatInput/ChatInput';
import ChooseFilesSheet from './components/ChooseFilesSheet/ChooseFilesSheet';
import ImportReportSheet from './components/ImportReportSheet/ImportReportSheet';
import SuggestedActions from './components/SuggestedActions/SuggestedActions';
import {
  PHOTO_OPTIONS_MOCK,
  REPORT_OPTIONS_MOCK,
  SUGGESTED_ACTIONS_MOCK,
} from './data/aiAssistant.mock';
import { useAIAssistant } from './hooks/useAIAssistant';
import { createAIAssistantStyles } from './styles/aiAssistant.styles';

export default function AIAssistantScreen({ route, navigation }: { route: any; navigation: any }) {
  const theme = useTheme();
  const styles = createAIAssistantStyles(theme);
  const chatId = route.params?.chatId;
  const handleScroll = useScrollStore((state) => state.handleScroll);

  useEffect(() => {
    if (chatId) {
      // loadChat(chatId);
    }
  }, [chatId]);

  const {
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
    listRef,
    sendMessage,
  } = useAIAssistant();

  const rightActions = (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatHistory')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={styles.historyBtn}>
        <Ionicons size={22} name="chatbubble-ellipses-outline" color={theme.colors.textPrimary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <AppHeader
        title="AI Assistant"
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={rightActions}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <FlatList
          onScroll={handleScroll}
          ref={listRef}
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[
            styles.messageList,
            messages.length === 0 && styles.emptyListContainer,
          ]}
          ListEmptyComponent={<EmptyChatState />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const prev = messages[index - 1];
            const showDate = !prev || prev.timestamp !== item.timestamp;
            return <ChatBubble message={item} showDateSeparator={showDate} />;
          }}
        />

        {messages.length > 0 && (
          <SuggestedActions
            actions={SUGGESTED_ACTIONS_MOCK}
            onPress={(label) => sendMessage(label)}
          />
        )}

        <ChatInput
          value={inputText}
          onChangeText={setInputText}
          onSend={() => sendMessage(inputText)}
          onAttachPress={(type) => setAttachmentSheet(type)}
          importedReport={importedReport}
          onClearReport={clearImportedReport}
        />
      </KeyboardAvoidingView>

      <ImportReportSheet
        visible={attachmentSheet === 'import_report'}
        reports={REPORT_OPTIONS_MOCK}
        selectedIds={selectedReports}
        onToggle={toggleReportSelection}
        onConfirm={confirmReportImport}
        onClose={() => setAttachmentSheet(null)}
      />

      <ChooseFilesSheet
        visible={attachmentSheet === 'choose_files'}
        photos={PHOTO_OPTIONS_MOCK}
        onConfirm={() => setAttachmentSheet(null)}
        onClose={() => setAttachmentSheet(null)}
      />
    </SafeAreaView>
  );
}

function EmptyChatState() {
  const theme = useTheme();
  const styles = createAIAssistantStyles(theme);

  return (
    <View style={styles.emptyContainer}>
      <AppImage source={AppImages.noChat} containerStyle={styles.emptyImage} contentFit="contain" />
      <AppText style={styles.emptyTitle}>No Conversations Yet</AppText>
      <AppText style={styles.emptySubtitle}>
        Start a chat with the AI Assistant to ask questions about your retinal health, reports, and
        screenings.
      </AppText>
    </View>
  );
}
