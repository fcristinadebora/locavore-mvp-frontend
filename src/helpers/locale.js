const locale = "pt-BR";
const currency = "BRL";

function toMoney(value) {
  const moneyFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return moneyFormat.format(value);
}

export { toMoney };
