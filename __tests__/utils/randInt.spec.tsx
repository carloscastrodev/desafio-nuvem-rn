import randInt from 'infra/utils/randInt';

describe('randInt()', () => {
  it('Deve retornar um número inteiro aleatório entre dois valores.', () => {
    const min = 1;
    const max = 10;
    const randomInt = randInt(min, max);
    expect(Number.isInteger(randomInt)).toBeTruthy();
    expect(randomInt).toBeGreaterThanOrEqual(min);
    expect(randomInt).toBeLessThanOrEqual(max);
  });

  it('Deve retornar o mesmo número quando os valores forem iguais.', () => {
    const minMax = 10;
    const randomInt = randInt(minMax, minMax);
    expect(randomInt).toEqual(minMax);
  });
});
