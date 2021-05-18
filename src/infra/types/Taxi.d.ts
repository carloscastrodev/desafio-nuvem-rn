import {ImageURISource} from 'react-native';

export interface Taxi {
  id: number;
  nome: string;
  latitude: number;
  longitude: number;
  imageUri?: ImageURISource;
  precoKm?: number;
  limiteKm?: number;
  kmRodado?: number;
}
