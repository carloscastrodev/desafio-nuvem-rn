import boundingBox from 'infra/utils/boundingBox';

const mockCoords: [number, number][] = [
  [0, 0],
  [-1, 0],
  [-1, -1],
  [1, 1],
  [1, 2],
  [2, 2],
];

describe('boundingBox()', () => {
  it('Deve retornar as coordenadas das fronteiras corretamente.', () => {
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
});
