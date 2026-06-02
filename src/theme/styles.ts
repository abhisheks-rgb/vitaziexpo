import { StyleSheet } from 'react-native';
import { Typography } from './typography';

export const GlobalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...Typography.title,
  },

  body: {
    ...Typography.body,
  },
});