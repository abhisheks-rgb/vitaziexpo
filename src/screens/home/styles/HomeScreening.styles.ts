// styles/HomeScreening.styles.ts
import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';
import { Spacing } from '../../../theme/spacing';

export const screeningStyles = StyleSheet.create({
  screeningCard: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  eyeCareJourneyCard: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
    padding: Spacing.md,
    color: '',
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
  // In screeningStyles:
  followUp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: `${Colors.skyBlue}20`, // ~12% opacity light blue
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 8,
    borderRadius: Radius.md,
  },
  followUpIconCircle: {
    width: 24,
    height: 24,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Add to screeningStyles:
  visitReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.navyDark,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: Radius.full,
  },
});
