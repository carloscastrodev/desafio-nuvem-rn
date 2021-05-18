import AsyncStorage from '@react-native-async-storage/async-storage';
import TaxiModel from './models/TaxiModel';

const store = {
  taxis: new TaxiModel(AsyncStorage),
};

export default store;
