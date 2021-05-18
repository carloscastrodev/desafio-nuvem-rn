import colors from 'infra/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
  },
  menuButton: {
    width: 36,
    height: 36,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  notificationsBadge: {
    position: 'absolute',
    top: -1,
    right: -1,
  },
});

export default styles;
