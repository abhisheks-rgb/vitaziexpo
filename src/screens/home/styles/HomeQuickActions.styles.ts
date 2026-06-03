// styles/HomeQuickActions.styles.ts
import { StyleSheet } from 'react-native';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

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
  quickActionCard: {
    width: 60,
    height: 60,
    borderRadius: Radius.lg,
  },
  quickActionInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionIcon: {
    width: 24,
    height: 24,
  },
  quickActionLabel: {
    fontSize: 11,
  },
});