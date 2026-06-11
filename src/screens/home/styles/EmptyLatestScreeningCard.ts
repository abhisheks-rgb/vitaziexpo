// styles/HomeScreening.styles.ts
import { StyleSheet } from 'react-native';

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
  emptyScreeningBodyView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  welcomeText: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  subtitleWelcomeText: { fontSize: 13, marginBottom: 10 },
  arrowText: { color: '#fff', fontSize:25 },
  learnHowItWorksText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  clinicNotificationText: { fontSize: 13, marginBottom: 16 },
  arrowCircle: { backgroundColor: 'rgba(255,255,255,0.25)', height: 20, width: 20, borderRadius: 40, padding: 4, justifyContent: 'center', alignItems: 'center', alignContent: 'center' },
  learnHowItWorksButton: {
              backgroundColor: Colors.navyDark,
              borderRadius: 30,
              paddingVertical: 8,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              gap: 15,
            },

});
