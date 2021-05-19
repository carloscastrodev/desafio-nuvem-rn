import colors from 'infra/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 0,
    padding: 8,
    width: '100%',
    height: '84%',
    backgroundColor: colors.white,
    zIndex: 2,
    marginTop: 'auto',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
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
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  personInfo: {
    alignItems: 'center',
  },
  personName: {
    marginTop: 10,
  },
  avatarImageWrapper: {
    width: 120,
    height: 120,
    borderRadius: 50,
    overflow: 'hidden',
  },
  avatar: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  priceInfo: {
    fontSize: 16,
  },
  carIcon: {height: 40, width: 70, resizeMode: 'contain'},
  kmInput: {
    marginTop: 8,
  },
  submitButton: {
    width: '100%',
    marginTop: 24,
    padding: 0,
    height: 50,
    justifyContent: 'center',
  },
  submitButtonLabel: {
    width: '100%',
    height: 50,
    textAlignVertical: 'center',
  },
  importantText: {
    fontSize: 18,
  },
  label: {
    fontSize: 14,
  },
  section: {
    marginTop: 24,
  },
});

export default styles;
