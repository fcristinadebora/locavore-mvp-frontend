function fromMeterToKm(value) {
  return parseFloat((value / 1000).toFixed(2).replace('.'));
}

export { fromMeterToKm };
