import boundingBox from 'infra/utils/boundingBox';

describe('boundingBox()', () => {
  it('Deve retornar as coordenadas das fronteiras corretamente com mais de um ponto.', () => {
    const mockCoords: [number, number][] = [
      [0, 0],
      [-1, 0],
      [-1, -1],
      [1, 1],
      [1, 2],
      [2, 2],
    ];

    const _boundingBox = boundingBox(mockCoords);
    const testBoundingBox: BoundingBox = {
      minLat: -1,
      minLong: -1,
      maxLat: 2,
      maxLong: 2,
      center: [0.5, 0.5],
    };

    expect(_boundingBox).toEqual(testBoundingBox);
  });

  it('Deve retornar as coordenadas das fronteiras corretamente com apenas um ponto.', () => {
    const mockCoords: [number, number][] = [[-1, -1]];

    const _boundingBox = boundingBox(mockCoords);
    const testBoundingBox: BoundingBox = {
      minLat: -1,
      minLong: -1,
      maxLat: -1,
      maxLong: -1,
      center: [-1, -1],
    };

    expect(_boundingBox).toEqual(testBoundingBox);
  });

  it('Deve lançar um erro quando não houver nenhum ponto.', () => {
    const mockCoords: [number, number][] = [];

    const _boundingBox = () => boundingBox(mockCoords);

    expect(_boundingBox).toThrow(Error);
  });
});
