import { StyleSheet } from 'react-native';

import { Colors } from '../../theme/colors';
import { Spacing } from '../../theme/spacing';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
  },

  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },

  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  leftLogoContainer: {
    alignItems: 'flex-start',
    paddingLeft: 60,
  },

  rightSection: {
    marginLeft: 'auto',
    minWidth: 48,
    alignItems: 'flex-end',
  },

  logo: {
    width: 120,
    height: 32,
  },

  title: {
    color: Colors.navyDark,
    fontWeight: '600',
    flexShrink: 1,
  },
  titleContainerLeft: {
    flex: 1,
    marginLeft: Spacing.sm,
  },
});
