import colors from 'infra/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 36,
  },
  cardList: {
    paddingVertical: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginVertical: 8,
  },
  cardContent: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    borderRadius: 16,
  },
  cardImageWrapper: {
    backgroundColor: colors.whiteAccent,
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 16,
  },
  cardImage: {
    borderRadius: 50,
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  taxiInfoWrapper: {
    justifyContent: 'space-between',
  },
  taxiInfoName: {
    fontSize: 18,
  },
  taxiInfoKm: {
    fontSize: 12,
    color: colors.gray,
  },
  taxiInfoEarning: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default styles;
