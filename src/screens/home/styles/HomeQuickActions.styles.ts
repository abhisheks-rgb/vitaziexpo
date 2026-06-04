// styles/HomeQuickActions.styles.ts
import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

export const quickActionsStyles = StyleSheet.create({
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  quickAction: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  // HomeQuickActions.styles.ts
  quickActionCard: {
    width: 64,
    height: 64,
    borderRadius: 32, // ← perfect circle
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: Colors.white,
  },
  quickActionInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    width: 26,
    height: 26,
  },
  quickActionLabel: {
    fontSize: 11,
  },
});
