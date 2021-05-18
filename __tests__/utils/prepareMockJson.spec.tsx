import {Taxi} from 'infra/types/Taxi';
import prepareMockJson from 'infra/utils/prepareMockJson';

describe('prepareMockJson()', () => {
  const mockTaxis: Taxi[] = [
    {
      id: 1,
      nome: 'Taxi',
      latitude: 10,
      longitude: 10,
    },
    {
      id: 2,
      nome: 'Taxi',
      latitude: 10,
      longitude: 10,
    },
    {
      id: 3,
      nome: 'Taxi',
      latitude: 10,
      longitude: 10,
    },
  ];
  it('Deve incluir as propriedades corretas no objeto do mock.', () => {
    const [preparedMockTaxi] = prepareMockJson(mockTaxis);
    expect(preparedMockTaxi).toHaveProperty('imageUri');
    expect(preparedMockTaxi).toHaveProperty('limiteKm');
    expect(preparedMockTaxi).toHaveProperty('precoKm');
    expect(preparedMockTaxi).toHaveProperty('kmRodado');
  });
});
