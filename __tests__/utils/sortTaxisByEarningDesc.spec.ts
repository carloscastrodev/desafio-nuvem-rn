import {Taxi} from 'infra/types/Taxi';
import getTaxiEarning from 'infra/utils/getTaxiEarning';
import sortTaxisByEarningDesc from 'infra/utils/sortTaxisByEarningDesc';

const taxiFactory = (km: number, price: number) => {
  const mockTaxi: Taxi = {
    id: 1,
    latitude: 0,
    longitude: 0,
    nome: 'Taxi',
    kmRodado: km,
    precoKm: price,
  };
  return mockTaxi;
};
describe('sortTaxisByEarningDesc()', () => {
  it('Deve retornar os taxis em ordem decrescente de faturamento.', () => {
    const mockTaxis: Taxi[] = [
      taxiFactory(1, 1),
      taxiFactory(1, 5),
      taxiFactory(2, 2),
      taxiFactory(2, 1),
      taxiFactory(2, 3),
      taxiFactory(3, 4),
    ];

    const sorted = sortTaxisByEarningDesc(mockTaxis);
    sorted.reduce((curr, next) => {
      expect(getTaxiEarning(curr)).toBeGreaterThanOrEqual(getTaxiEarning(next));
      return next;
    });
    expect(sorted).toEqual([
      mockTaxis[5],
      mockTaxis[4],
      mockTaxis[1],
      mockTaxis[2],
      mockTaxis[3],
      mockTaxis[0],
    ]);
  });
});
