import {ImageSourcePropType} from 'react-native';

export interface Taxi {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  imageUri?: ImageSourcePropType;
  precoKm?: number;
  limiteKm?: number;
  kmRodado?: number;
}
