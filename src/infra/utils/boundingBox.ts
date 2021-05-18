export default function boundingBox(coords: [number, number][]): BoundingBox {
  const _boundingBox = coords.reduce(
    (acc, coord) => {
      if (acc.minLat > coord[0]) {
        acc.minLat = coord[0];
      }
      if (acc.maxLat < coord[0]) {
        acc.maxLat = coord[0];
      }
      if (acc.minLong > coord[1]) {
        acc.minLong = coord[1];
      }
      if (acc.maxLong < coord[1]) {
        acc.maxLong = coord[1];
      }

      return acc;
    },
    {
      minLat: Number.POSITIVE_INFINITY,
      minLong: Number.POSITIVE_INFINITY,
      maxLat: Number.NEGATIVE_INFINITY,
      maxLong: Number.NEGATIVE_INFINITY,
      center: [0, 0] as [number, number],
    },
  );
  const xCenter = (_boundingBox.maxLat + _boundingBox.minLat) / 2;
  const yCenter = (_boundingBox.maxLong + _boundingBox.minLong) / 2;
  _boundingBox.center = [xCenter, yCenter];
  return _boundingBox;
}
