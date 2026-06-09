import React from 'react';
import { View, ViewStyle } from 'react-native';

import { AppImages } from '../../constants';
import AppImage from '../AppImage';
import AppText from '../AppText';

import styles from './AppHeader.styles';
import BackButton from './BackButton';

interface AppHeaderProps {
  title?: string;
  titlePosition?: 'left' | 'center' | 'right';
  showBackButton?: boolean;
  onBackPress?: () => void;
  showLogo?: boolean;
  logoPosition?: 'left' | 'center';
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export default function AppHeader({
  title,
  titlePosition = 'center',
  showBackButton = false,
  onBackPress,
  rightComponent,
  containerStyle,
  showLogo = false,
  logoPosition = 'center',
}: AppHeaderProps) {
  const renderTitle = () => (
    <AppText variant="subtitle" numberOfLines={1} style={styles.title}>
      {title}
    </AppText>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {/* LEFT */}
      <View style={styles.left}>
        {showBackButton && <BackButton onPress={onBackPress ?? (() => {})} />}

        {titlePosition === 'left' && title ? renderTitle() : null}
      </View>

      {/* CENTER */}
      <View style={styles.centerContainer}>
        {titlePosition === 'center' && title ? renderTitle() : null}
        {showLogo && (
          <AppImage
            source={AppImages.logoDark}
            containerStyle={styles.logo}
            contentFit="contain"
            showLoader={false}
          />
        )}
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        {titlePosition === 'right' && title ? renderTitle() : null}

        {rightComponent}
      </View>
    </View>
  );
}
