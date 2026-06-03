// styles/HomeScreening.styles.ts
import { StyleSheet } from 'react-native';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';
import { Radius } from '../../../theme/radius';

export const screeningStyles = StyleSheet.create({
  screeningCard: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  screeningImage: {
    width: '100%',
    height: 160,
    backgroundColor: '#111',
  },
  screeningFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  screeningFooterLeft: {
    flex: 1,
    gap: 2,
  },
  screeningClinic: {
    fontWeight: '600',
  },
  arrowCircle: {
    width: 18,
    height: 18,
    borderRadius: Radius.full,
    backgroundColor: Colors.navyDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '600',
  },
  followUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: `${Colors.skyBlue}22`,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.md,
  },
  followUpArrow: {
    fontSize: 14,
    color: Colors.navyDark,
  },
});