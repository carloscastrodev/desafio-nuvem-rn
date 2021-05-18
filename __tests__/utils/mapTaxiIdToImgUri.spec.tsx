import mapTaxiIdToImgUri from 'infra/utils/mapTaxiIdToImgUri';

describe('mapTaxiIdToImgUri()', () => {
  const validId = 1;
  const invalidId = 99;

  it('Deve retornar um URI quando o id for válido.', () => {
    const uri = mapTaxiIdToImgUri(validId);
    expect(uri).toBeDefined();
  });

  it('Deve retornar indefinido quando o id for inválido.', () => {
    const uri = mapTaxiIdToImgUri(invalidId);
    expect(uri).toBeUndefined();
  });
});
