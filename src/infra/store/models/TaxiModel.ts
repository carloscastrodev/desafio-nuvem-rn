import {AsyncStorageStatic} from '@react-native-async-storage/async-storage';
import {StoreModel} from 'infra/types/StoreModel';
import {Taxi} from 'infra/types/Taxi';

class TaxiModel implements StoreModel<Taxi> {
  store: AsyncStorageStatic;
  key: string = '@taxis';
  constructor(store: AsyncStorageStatic) {
    this.store = store;
  }

  async exists() {
    const tableString = await this.store.getItem(this.key);
    return !!tableString;
  }

  async findById(id: string | number) {
    const tableString = await this.store.getItem(this.key);
    if (!tableString) {
      throw new Error('Tabela não inicializada.');
    }
    const table: Taxi[] = JSON.parse(tableString);
    const taxi = table.find(e => e.id === id);
    return taxi || null;
  }

  async findAll() {
    const tableString = await this.store.getItem(this.key);
    if (!tableString) {
      throw new Error('Tabela não inicializada.');
    }
    const table: Taxi[] = JSON.parse(tableString);
    return table;
  }

  async save(payload: Taxi[]) {
    await this.store.setItem(this.key, JSON.stringify(payload));
  }

  async saveById(payload: Taxi) {
    const tableString = await this.store.getItem(this.key);
    if (!tableString) {
      throw new Error('Tabela não inicializada.');
    }
    const table: Taxi[] = JSON.parse(tableString);
    const targetIndex = table.findIndex(e => e.id === payload.id);
    table[targetIndex] = payload;

    await this.store.setItem(this.key, JSON.stringify(table));
  }

  async wipe() {
    await this.store.removeItem(this.key, _ => {
      // Alguma lógica para tratamento do erro...
    });
  }
}

export default TaxiModel;
