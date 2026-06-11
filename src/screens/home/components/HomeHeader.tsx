import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../constants';
import { useLogout } from '../../../hooks/useLogout';
import { useTranslation } from '../../../hooks/useTranslation';
import type { HomeScreenProps } from '../../../navigation/types';
import { useAuthStore } from '../../../state/store/authStore';
import { useTheme } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { createHeaderStyles } from '../styles/HomeHeader.styles';

export default function HomeHeader({ navigation }: HomeScreenProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const styles = createHeaderStyles(theme);
  const { logout, isLoading } = useLogout();

  // Live user data from persisted store — updates instantly on login/logout
  const currentUser = useAuthStore((s) => s.currentUser);
  const greeting = useGreeting(t);
  const displayName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '';

  return (
    <View style={styles.header}>
      <View>
        <AppText variant="caption" style={styles.greeting} color={Colors.muted}>
          {greeting}
        </AppText>
        <AppText variant="subtitle" color={theme.colors.text} style={styles.name}>
          {displayName}
        </AppText>
      </View>

      <View style={styles.headerRight}>
        <TouchableOpacity>
          <AppImage source={AppImages.searchAi} containerStyle={styles.headerIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate({ name: 'Notifications' })}>
          <AppImage source={AppImages.notification} containerStyle={styles.headerIcon} />
        </TouchableOpacity>

        {/* Tap avatar to log out — confirmation alert shown by useLogout */}
        <TouchableOpacity onPress={logout} disabled={isLoading}>
          <AppImage
            source={AppImages.avatar ?? AppImages.logoDark}
            containerStyle={[styles.avatar, isLoading && { opacity: 0.5 }]}
            contentFit="cover"
            showLoader={false}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

/** Returns the correct greeting based on current hour */
function useGreeting(t: (key: string) => string): string {
  const hour = new Date().getHours();
  if (hour < 12) return t('home.greetingMorning');
  if (hour < 18) return t('home.greetingAfternoon');
  return t('home.greetingEvening');
}
