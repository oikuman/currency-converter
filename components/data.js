const obj = {
  EUR: { currencyName: "Euro", currencySymbol: "€", id: "EUR" },
  USD: {
    currencyName: "United States Dollar",
    currencySymbol: "$",
    id: "USD",
  },
  HUF: {
    currencyName: "Hungarian Forint",
    currencySymbol: "Ft",
    id: "HUF",
  },
  AUD: {
    currencyName: "Australian Dollar",
    currencySymbol: "$",
    id: "AUD",
  },
  SEK: {
    currencyName: "Swedish Krona",
    currencySymbol: "kr",
    id: "SEK",
  },
  BAM: {
    currencyName: "Bosnia And Herzegovina Konvertibilna Marka",
    currencySymbol: "KM",
    id: "BAM",
  },
  CNY: {
    currencyName: "Chinese Yuan",
    currencySymbol: "¥",
    id: "CNY",
  },
  CZK: {
    currencyName: "Czech Koruna",
    currencySymbol: "Kč",
    id: "CZK",
  },
  KRW: {
    currencyName: "South Korean Won",
    currencySymbol: "₩",
    id: "KRW",
  },
  DKK: {
    currencyName: "Danish Krone",
    currencySymbol: "kr",
    id: "DKK",
  },
  KZT: {
    currencyName: "Kazakhstani Tenge",
    currencySymbol: "лв",
    id: "KZT",
  },
  BGN: {
    currencyName: "Bulgarian Lev",
    currencySymbol: "лв",
    id: "BGN",
  },
  CAD: {
    currencyName: "Canadian Dollar",
    currencySymbol: "$",
    id: "CAD",
  },
  JPY: {
    currencyName: "Japanese Yen",
    currencySymbol: "¥",
    id: "JPY",
  },
  LVL: {
    currencyName: "Latvian Lats",
    currencySymbol: "Ls",
    id: "LVL",
  },
  CHF: {
    currencyName: "Swiss Franc",
    currencySymbol: "Fr.",
    id: "CHF",
  },
  PLN: {
    currencyName: "Polish Zloty",
    currencySymbol: "zł",
    id: "PLN",
  },
  UAH: {
    currencyName: "Ukrainian Hryvnia",
    currencySymbol: "₴",
    id: "UAH",
  },
  GBP: {
    currencyName: "British Pound",
    currencySymbol: "£",
    id: "GBP",
  },
};

export const ids = [
  "USD",
  "EUR",
  "HUF",
  "AUD",
  "SEK",
  "BAM",
  "CNY",
  "CZK",
  "KRW",
  "DKK",
  "KZT",
  "BGN",
  "CAD",
  "JPY",
  "LVL",
  "CHF",
  "PLN",
  "UAH",
  "GBP",
];

const currencies = ids.map((item) => {
  return obj[item];
});

const data = currencies.sort((a, b) =>
  a["currencyName"].localeCompare(b["currencyName"], "en", {
    sensitivity: "base",
  })
);

export default data;
