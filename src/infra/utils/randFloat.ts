const randFloat = (min: number, max: number, decimalPlaces: number): number => {
  const random = Math.random() * (max - min) + min;

  return Number.parseFloat(random.toFixed(decimalPlaces));
};

export default randFloat;
