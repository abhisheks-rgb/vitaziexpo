import React from 'react';
import { View, ViewStyle } from 'react-native';
import AppText from '../AppText';
import styles from './AppHeader.styles';
import BackButton from './BackButton';

interface AppHeaderProps {
  title?: string;
  titlePosition?: 'left' | 'center' | 'right';
  showBackButton?: boolean;
  onBackPress?: () => void;
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
      <View style={styles.center}>
        {titlePosition === 'center' && title ? renderTitle() : null}
      </View>

      {/* RIGHT */}
      <View style={styles.right}>
        {titlePosition === 'right' && title ? renderTitle() : null}

        {rightComponent}
      </View>
    </View>
  );
}
