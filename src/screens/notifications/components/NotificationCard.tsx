import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import { AppImages } from '../../../constants';
import { useTheme } from '../../../theme';
import { NotificationItem } from '../data';
import { createListStyles } from '../styles/NotificationList.styles';

interface Props {
  item: NotificationItem;
  onPress: () => void;
}

export default function NotificationCard({ item, onPress }: Props) {
  const theme = useTheme();
  const styles = createListStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.card, item.bold && styles.cardBold]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.cardInner}>
        <View style={styles.bellWrap}>
          <AppImage source={AppImages.notificationYellow} />
        </View>

        <View style={styles.cardText}>
          <AppText style={[styles.cardMessage, item.bold && styles.cardMessageBold]}>
            {item.message}
          </AppText>

          <AppText style={styles.cardTime}>{item.time}</AppText>
        </View>

        <AppImage
          source={AppImages.arrowForward}
          containerStyle={{
            width: 60,
            height: 60,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}
