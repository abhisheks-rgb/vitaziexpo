import { StyleSheet } from 'react-native';

import { Colors } from '../../../theme/colors';
import { Radius } from '../../../theme/radius';

export const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.limeGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
