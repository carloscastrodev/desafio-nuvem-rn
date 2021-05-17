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
    expect(_boundingBox).toEqual({
      x1: -1,
      y1: -1,
      x2: 2,
      y2: 2,
    });
  });
});
