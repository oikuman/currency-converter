import React from "react";
import axios from "axios";
import shortid from "shortid";
const Converter = () => {
  const [currencies, setCurrencies] = React.useState(null);
  const [currency, setCurrency] = React.useState(0);
  const [sum, setSum] = React.useState(0);
  const [convert, setConvert] = React.useState(0);
  React.useEffect(() => {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then((res) => {
        setCurrencies(res.data);
      })
      .catch(console.log);
  }, []);

  const handleSum = (e) => {
    setSum(Number(e.target.value));
  };

  const handleSelect = (e) => setCurrency(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currencies && currency)
      setConvert((findRate(currency) * sum).toFixed(2));
  };

  const findRate = (curr) => {
    if (currencies && currency)
      return Number(currencies.find((el) => el.ccy === curr).buy);
    return 0;
  };

  return (
    <div>
      <h2>Конвертор валют</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="select">Обрати валюту</label>
          <select id="select" value={currency} onChange={handleSelect}>
            <option value={0} hidden disabled></option>
            {currencies &&
              currencies.map((item) => (
                <option key={shortid()} value={item.ccy}>
                  {item.ccy}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="sum">Сума у валюті</label>
          <input id="sum" value={sum} onChange={handleSum} />
        </div>
        <div>
          <label htmlFor="convert">Конвертована сума (гривень)</label>
          <input id="convert" value={convert} readOnly />
        </div>
        <p>{currency}</p>
        <p>{currency && findRate(currency)}</p>
        <input type="submit" style={{ visibility: "hidden" }} />
      </form>
    </div>
  );
};

export default Converter;
