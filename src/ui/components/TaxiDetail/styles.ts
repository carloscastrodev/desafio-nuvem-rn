import colors from 'infra/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    position: 'absolute',
    width: '100%',
    height: '84%',
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  container: {
    padding: 8,
    ...StyleSheet.absoluteFillObject,
  },
  headerMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  closeButton: {
    marginLeft: 'auto',
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  content: {
    flex: 1,
  },
});

export default styles;
