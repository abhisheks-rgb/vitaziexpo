import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

export const clinicStyles = StyleSheet.create({
  clinicCard: {
    marginBottom: Spacing.md,
  },
  clinicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  clinicIconWrap: {
    width: 40,
    height: 40,
    borderRadius: Radius.md,
    backgroundColor: `${Colors.skyBlue}22`,
    alignItems: 'center',
    justifyContent: 'center',
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