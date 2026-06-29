import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },

  left: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
  },

  right: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  title: {
    marginLeft: 8,
    flexShrink: 1,
  },

  logo: {
    width: 120,
    height: 32,
  },

  centerContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
