function fromMeterToKm(value) {
  return (value / 1000).toFixed(1).replace('.', ',');
}

export { fromMeterToKm };
