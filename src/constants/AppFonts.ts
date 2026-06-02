export const AppFonts = {
  afacadMedium: 'Afacad-Medium',
  afacadRegular: 'Afacad-Regular',
  poppinsRegular: 'Poppins-Regular',
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
} as const;

export const AppFontAssets = {
  [AppFonts.afacadMedium]: require('../../assets/fonts/Afacad-Medium.ttf'),
  [AppFonts.afacadRegular]: require('../../assets/fonts/Afacad-Regular.ttf'),

  [AppFonts.poppinsRegular]: require('../../assets/fonts/Poppins-Regular.ttf'),
  [AppFonts.poppinsMedium]: require('../../assets/fonts/Poppins-Medium.ttf'),
  [AppFonts.poppinsSemiBold]: require('../../assets/fonts/Poppins-SemiBold.ttf'),
} as const;