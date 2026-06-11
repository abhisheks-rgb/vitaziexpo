import { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { NotificationsScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';

import NotificationCard from './components/NotificationCard';
import { notificationGroups } from './data';
import { createListStyles } from './styles/NotificationList.styles';

const strings = {
  screenTitle: 'Notifications',
};

export default function NotificationsScreen({ navigation }: NotificationsScreenProps) {
  const theme = useTheme();
  const styles = useMemo(() => createListStyles(theme), [theme]);

  const handleCardPress = (id: string) => {
    navigation.navigate('NotificationDetail', {
      notificationId: id,
    });
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'left', 'right']}>
      <BackgroundBlobs />
      <AppHeader
        title={strings.screenTitle}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {notificationGroups.map((group) => (
          <View key={group.label}>
            <View style={styles.groupLabelWrap}>
              <AppText style={styles.groupLabel}>{group.label}</AppText>
            </View>

            {group.items.map((item) => (
              <NotificationCard
                key={item.id}
                item={item}
                onPress={() => handleCardPress(item.id)}
              />
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
