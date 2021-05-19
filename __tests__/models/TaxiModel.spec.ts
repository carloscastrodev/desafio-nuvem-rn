import AsyncStorage from '@react-native-async-storage/async-storage';
import TaxiModel from 'infra/store/models/TaxiModel';
import {Taxi} from 'infra/types/Taxi';

describe('TaxiModel', () => {
  let model: TaxiModel;
  let modelKey: string;
  beforeEach(() => {
    model = new TaxiModel(AsyncStorage);
    modelKey = model.key;
  });
  afterEach(() => {
    AsyncStorage.clear();
  });

  describe('exists()', () => {
    it('deve retornar verdadeiro quando a key existir.', async () => {
      await AsyncStorage.setItem(modelKey, '[]');
      const exists = await model.exists();
      expect(exists).toBeTruthy();
    });

    it('deve retornar falso quando a key não existir.', async () => {
      const exists = await model.exists();
      expect(exists).toBeFalsy();
    });
  });

  describe('findById()', () => {
    it('deve retornar um objeto quando existir.', async () => {
      const mockObj = {id: 1};
      const mockTable = [mockObj];

      await AsyncStorage.setItem(modelKey, JSON.stringify(mockTable));
      const obj = await model.findById(1);
      expect(obj).toEqual(mockObj);
    });

    it('deve retornar nulo quando não existir o objeto.', async () => {
      const mockObj = {id: 2};
      const mockTable = [mockObj];

      await AsyncStorage.setItem(modelKey, JSON.stringify(mockTable));
      const obj = await model.findById(1);
      expect(obj).toBeNull();
    });

    it('deve lançar um erro quando a key não existir.', async () => {
      const wrapper = async () => await model.findById(1);
      expect(wrapper).rejects.toThrow('Tabela não inicializada.');
    });
  });

  describe('findAll()', () => {
    it('deve retornar um array quando a key existir.', async () => {
      const mockObj = {id: 1};
      const mockTable = [mockObj];

      await AsyncStorage.setItem(modelKey, JSON.stringify(mockTable));
      const arr = await model.findAll();
      expect(arr).toEqual(mockTable);
    });

    it('deve lançar um erro quando a key não existir.', async () => {
      const wrapper = async () => await model.findAll();
      expect(wrapper).rejects.toThrow('Tabela não inicializada.');
    });
  });

  describe('save()', () => {
    it('deve salvar o payload na key.', async () => {
      const mockObj: Taxi = {id: 1, latitude: 0, longitude: 0, nome: 'Taxi'};
      const mockTable = [mockObj];

      model.save(mockTable);
      const saved = await AsyncStorage.getItem(modelKey);
      expect(saved).toEqual(JSON.stringify(mockTable));
    });
  });

  describe('saveById()', () => {
    it('deve alterar o objeto na key.', async () => {
      const mockObj1: Taxi = {id: 1, latitude: 0, longitude: 0, nome: 'Taxi'};
      const mockObj2: Taxi = {id: 2, latitude: 0, longitude: 0, nome: 'Taxi'};
      const testMock: Taxi = {
        id: 2,
        latitude: 0,
        longitude: 0,
        nome: 'Taxi Alterado',
      };
      const mockTable = [mockObj1, mockObj2];

      await AsyncStorage.setItem(modelKey, JSON.stringify(mockTable));
      await model.saveById(testMock);
      const stored = await AsyncStorage.getItem(modelKey);
      const changed = JSON.parse(stored as string).find(
        (e: Taxi) => e.id === 2,
      );
      expect(changed).toEqual(testMock);
      const notChanged = JSON.parse(stored as string).find(
        (e: Taxi) => e.id === 1,
      );
      expect(notChanged).toEqual(mockObj1);
    });
  });

  describe('wipe()', () => {
    it('deve apagar a key quando existir.', async () => {
      await AsyncStorage.setItem(modelKey, '[]');
      await model.wipe();
      const stored = await AsyncStorage.getItem(modelKey);
      expect(stored).toBeNull();
    });

    it('não deve lançar erro quando a key não existir.', async () => {
      const wrapper = async () => await model.wipe();
      expect(await wrapper()).toBeUndefined();
    });
  });
});
