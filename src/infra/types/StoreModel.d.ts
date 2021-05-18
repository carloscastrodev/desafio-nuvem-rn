import {AsyncStorageStatic} from '@react-native-async-storage/async-storage';

interface StoreModel<T> {
  key: string;
  store: AsyncStorageStatic;
  exists: () => Promise<boolean>;
  findById: (id: number | string) => Promise<T | null>;
  findAll: () => Promise<T[]>;
  save: (payload: T[]) => Promise<void>;
  saveById: (payload: T) => Promise<void>;
  wipe: () => Promise<void>;
}
