import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

export const clinicStyles = StyleSheet.create({
  clinicCard: {
    marginBottom: Spacing.md,
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  // clinicStyles
  clinicIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontWeight: '600',
  },
  clinicAddress: {
    fontSize: 11,
    marginTop: 1,
  },
  visitCount: {
    fontSize: 11,
  },
});
