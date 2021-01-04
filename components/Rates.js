import React from "react";
import axios from "axios";
import shortid from "shortid";

// https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5

import rates from "./rates.json";

const Rates = () => {
  const [exrates, setExrates] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
      .then(console.log)
      .catch(console.log);
  }, []);
  return (
    <div>
      <h2>Курси валют (Приватбанк)</h2>
      {/* <ul>
        {rates &&
          rates.map((el) => (
            <li key={shortid()}>
              <p>{el.ccy}</p>
              <p>{el.buy}</p>
              <p>{el.sale}</p>
            </li>
          ))}
      </ul> */}
      <table style={{ width: "100%", border: "1px solid black", margin: 0 }}>
        <thead>
          <tr>
            <th>Валюта</th>
            <th>Купівля</th>
            <th>Продаж</th>
          </tr>
        </thead>
        <tbody>
          {rates &&
            rates.map((el) => (
              <tr key={shortid()}>
                <td>{el.ccy}</td>
                <td>{el.buy}</td>
                <td>{el.sale}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Rates;
