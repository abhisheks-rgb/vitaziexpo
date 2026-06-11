// File: AIAssistant/AIAssistantScreen.tsx

import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { Colors, useTheme } from '../../theme';

import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { useScrollStore } from '../../hooks/useScrollStore';
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

export default function AIAssistantScreen({ route, navigation }: { route: any; navigation: any }) {
  const theme = useTheme();
  const chatId = route.params?.chatId;

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
  const handleScroll = useScrollStore((state) => state.handleScroll);

  const rightActions = (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatHistory')}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <View style={{ backgroundColor: Colors.white, padding: 8, borderRadius: 50 }}>
        <Ionicons size={22} name="chatbubble-ellipses-outline" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: '#EBF0F7' }]} edges={['top']}>
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
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => {
            const prev = messages[index - 1];
            const showDate = !prev || prev.timestamp !== item.timestamp;
            return <ChatBubble message={item} showDateSeparator={showDate} />;
          }}
        />

        <SuggestedActions
          actions={SUGGESTED_ACTIONS_MOCK}
          onPress={(label) => sendMessage(label)}
        />

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

const styles = StyleSheet.create({
  screen: { flex: 1 },
  flex: { flex: 1 },
  messageList: {
    paddingTop: 8,
    paddingBottom: 12,
  },
});
