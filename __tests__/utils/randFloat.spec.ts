import randFloat from 'infra/utils/randFloat';

describe('randFloat()', () => {
  it('Deve retornar um número aleatório entre dois valores.', () => {
    const min = 1;
    const max = 10;
    const decimalPlaces = 2;
    const randomFloat = randFloat(min, max, decimalPlaces);
    expect(Number.isFinite(randomFloat)).toBeTruthy();
    expect(randomFloat).toBeGreaterThanOrEqual(min);
    expect(randomFloat).toBeLessThan(max);
  });

  it('Deve retornar o mesmo número quando os valores forem iguais.', () => {
    const minMax = 10;
    const decimalPlaces = 2;
    const randomFloat = randFloat(minMax, minMax, decimalPlaces);
    expect(randomFloat).toEqual(minMax);
  });
});
