import React from 'react';
import { View } from 'react-native';

import { AppImages } from '../../constants';
import AppImage from '../AppImage';
import AppText from '../AppText';

import { styles } from './AppHeader.styles';
import BackButton from './BackButton';

interface AppHeaderProps {
  title?: string;
  titlePosition?: 'left' | 'center' | 'right';

  showBackButton?: boolean;
  onBackPress?: () => void;

  showLogo?: boolean;
  logoPosition?: 'left' | 'center';

  rightComponent?: React.ReactNode;
}

export default function AppHeader({
  title,
  titlePosition = 'center',

  showBackButton = false,
  onBackPress,

  showLogo = false,
  logoPosition = 'center',

  rightComponent,
}: AppHeaderProps) {
  const renderTitle = () => (
    <AppText variant="subtitle" style={styles.title}>
      {title}
    </AppText>
  );

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {showBackButton && onBackPress && <BackButton onPress={onBackPress} />}

        {titlePosition === 'left' && title ? (
          <View style={styles.titleContainerLeft}>
            <AppText variant="subtitle" style={styles.title}>
              {title}
            </AppText>
          </View>
        ) : null}
      </View>

      <View style={styles.centerContainer}>
        {title && titlePosition === 'center' && renderTitle()}

        {showLogo && (
          <AppImage
            source={AppImages.logoDark}
            containerStyle={styles.logo}
            contentFit="contain"
            showLoader={false}
          />
        )}
      </View>

      <View style={styles.rightSection}>
        {title && titlePosition === 'right' && renderTitle()}

        {rightComponent}
      </View>
    </View>
  );
}
