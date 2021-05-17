export default function boundingBox(coords: [number, number][]): {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
} {
  const _boundingBox = coords.reduce(
    (acc, coord) => {
      if (acc.x1 > coord[0]) {
        acc.x1 = coord[0];
      }
      if (acc.x2 < coord[0]) {
        acc.x2 = coord[0];
      }
      if (acc.y1 > coord[1]) {
        acc.y1 = coord[1];
      }
      if (acc.y2 < coord[1]) {
        acc.y2 = coord[1];
      }

      return acc;
    },

    {
      x1: Number.MAX_VALUE,
      y1: Number.MAX_VALUE,
      x2: Number.MIN_VALUE,
      y2: Number.MIN_VALUE,
    },
  );
  return _boundingBox;
}
