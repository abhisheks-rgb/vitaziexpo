import { StyleSheet } from 'react-native';

import { typography } from './typography';

export const GlobalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    ...typography.title,
  },

  body: {
    ...typography.body,
  },
});
