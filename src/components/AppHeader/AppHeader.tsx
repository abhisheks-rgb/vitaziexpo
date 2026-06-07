import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { AppImages } from '../../constants';
import AppImage from '../AppImage';
import AppText from '../AppText';
import { styles } from './AppHeader.styles';
import BackButton from './BackButton';

export type AppHeaderVariant = 'default' | 'overlay';

interface AppHeaderProps {
  title?: string;
  titlePosition?: 'left' | 'center' | 'right';
  showBackButton?: boolean;
  onBackPress?: () => void;
  showLogo?: boolean;
  logoPosition?: 'left' | 'center';
  rightComponent?: React.ReactNode;
  /**
   * 'default' — normal white header (existing behaviour, no change)
   * 'overlay' — floats over scroll content:
   *   • not scrolled → fully transparent background, white text/icons
   *   • scrolled     → frosted glass (BlurView) with a white tint
   */
  variant?: AppHeaderVariant;
  /**
   * Only meaningful when variant='overlay'.
   * Pass the scroll state from the parent screen:
   *   false → transparent (at the top of the page)
   *   true  → frosted glass (user has scrolled down)
   */
  scrolled?: boolean;
  /** Extra style applied to the outer container */
  containerStyle?: ViewStyle;
}

export default function AppHeader({
  title,
  titlePosition = 'center',
  showBackButton = false,
  onBackPress,
  showLogo = false,
  logoPosition = 'center',
  rightComponent,
  variant = 'default',
  scrolled = false,
  containerStyle,
}: AppHeaderProps) {
  const isOverlay = variant === 'overlay';

  const renderTitle = () => (
    <AppText
      variant="subtitle"
      style={[
        styles.title,
        // In overlay mode: white text when transparent, dark text when frosted
        isOverlay && !scrolled && overlayStyles.titleLight,
      ]}
    >
      {title}
    </AppText>
  );

  const innerContent = (
    <View
      style={[
        styles.container,
        // default variant keeps its original white bg (defined in AppHeader.styles)
        // overlay variant: bg is handled by BlurView below, so keep transparent here
        isOverlay && overlayStyles.containerTransparent,
        containerStyle,
      ]}
    >
      {/* Left — back button + optional left-aligned title */}
      <View style={styles.leftSection}>
        {showBackButton && onBackPress && (
          <BackButton
            onPress={onBackPress}
            // Optionally pass a light variant when transparent so the icon
            // is visible against the dark retinal image
            variant={isOverlay && !scrolled ? 'light' : 'default'}
          />
        )}
        {titlePosition === 'left' && title ? (
          <View style={styles.titleContainerLeft}>{renderTitle()}</View>
        ) : null}
      </View>

      {/* Center — title or logo */}
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

      {/* Right — right-aligned title or custom component */}
      <View style={styles.rightSection}>
        {title && titlePosition === 'right' && renderTitle()}
        {rightComponent}
      </View>
    </View>
  );

  // ── default variant: plain white header, no changes ──────────────────────
  if (!isOverlay) {
    return innerContent;
  }

  // ── overlay variant: wrap in BlurView that activates on scroll ───────────
  return (
    <BlurView intensity={scrolled ? 60 : 0} tint="light" style={overlayStyles.blurWrapper}>
      {/* White tint layer — fades in on scroll to lighten the blur */}
      {scrolled && <View style={overlayStyles.whiteTint} pointerEvents="none" />}
      {innerContent}
    </BlurView>
  );
}

// ─── Overlay-specific styles (don't touch AppHeader.styles) ──────────────────
const overlayStyles = StyleSheet.create({
  // Makes the inner container bg transparent so BlurView shows through
  containerTransparent: {
    backgroundColor: 'transparent',
  },
  // White text for use against the dark image when not yet scrolled
  titleLight: {
    color: '#ffffff',
  },
  // BlurView fills the full width; height is driven by inner content
  blurWrapper: {
    width: '100%',
  },
  // Soft white overlay to make the frosted effect feel lighter/warmer
  whiteTint: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
});
