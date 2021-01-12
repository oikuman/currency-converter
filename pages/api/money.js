// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({
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
  });
};
