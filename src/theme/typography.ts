import { AppFonts } from '../constants/AppFonts';

export const Typography = {
  titleXL: {
    fontFamily: AppFonts.afacadMedium,
    fontSize: 36,
    lineHeight: 42,
  },

  title: {
    fontFamily: AppFonts.afacadMedium,
    fontSize: 40,
    lineHeight: 38,
  },

  subtitle: {
    fontFamily: AppFonts.poppinsSemiBold,
    fontSize: 18,
    lineHeight: 26,
  },

  body: {
    fontFamily: AppFonts.poppinsRegular,
    fontSize: 15,
    lineHeight: 22,
  },

  caption: {
    fontFamily: AppFonts.poppinsRegular,
    fontSize: 13,
    lineHeight: 18,
  },

  button: {
    fontFamily: AppFonts.poppinsSemiBold,
    fontSize: 15,
    lineHeight: 20,
  },
} as const;
