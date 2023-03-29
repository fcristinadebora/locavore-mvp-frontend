import moment from "moment/moment";
const locale = "pt-BR";
const currency = "BRL";

function toMoney(value) {
  const moneyFormat = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  });

  return moneyFormat.format(value);
}

function toDate(value) {
  return moment(value).format('DD/MM/YYYY')
}

export { toMoney, toDate };
