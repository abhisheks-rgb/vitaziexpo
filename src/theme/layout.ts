import { StyleSheet } from 'react-native';

export const Layout = StyleSheet.create({
  screen: {
    flex: 1,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },
});