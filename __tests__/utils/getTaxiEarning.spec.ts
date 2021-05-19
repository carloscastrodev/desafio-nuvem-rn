import {Taxi} from 'infra/types/Taxi';
import getTaxiEarning from 'infra/utils/getTaxiEarning';

describe('getTaxiEarning()', () => {
  it('Deve retornar o faturamento correto do taxi.', () => {
    const km = Math.random();
    const price = Math.random();
    const earning = km * price;
    const mockTaxi: Taxi = {
      id: 1,
      latitude: 0,
      longitude: 0,
      nome: 'Taxi',
      kmRodado: km,
      precoKm: price,
    };

    const testEarning = getTaxiEarning(mockTaxi);
    expect(testEarning).toEqual(earning);
  });
});
