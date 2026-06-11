// styles/HomeScreening.styles.ts
import { StyleSheet } from 'react-native';

import { Radius } from '../../../theme';
import { Colors } from '../../../theme/colors';
import { Spacing } from '../../../theme/spacing';

export const emptyScreeningStyles = StyleSheet.create({
  emptyScheduleImage: { width: 150, height: 150 },
  emptyScreeningCard: {
    marginBottom: Spacing.md,
    overflow: 'hidden',
    padding: Spacing.md,
    color: '',
  },
  emptyScreeningBodyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },

  aiIcon: {
    aspectRatio: 3,
    height: 22,
    marginLeft: 6,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
  },

  subtitleWelcomeText: { fontSize: 13, marginBottom: 10 },
  arrowText: { color: '#fff', fontSize: 25 },
  learnHowItWorksText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  clinicNotificationText: { fontSize: 13, marginBottom: 16 },
  arrowCircle: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    height: 20,
    width: 20,
    borderRadius: 40,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  learnHowItWorksButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.navyDark,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    borderRadius: Radius.full,
    alignSelf: 'flex-start', // prevents stretching
  },
});
