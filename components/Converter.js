import React from "react";
import axios from "axios";
import { NotificationContainer } from "react-notifications";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CurrSelect from "../components/CurrSelect";
import withLayout from "./withLayout";
import data from "./data";

import { createWarning } from "./alerts";

const useStyles = makeStyles((theme) => ({
  button: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Converter = () => {
  const classes = useStyles();
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [convertCurrency, setConvertCurrency] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [convert, setConvert] = React.useState(0);
  const [respErr, setRespErr] = React.useState(null);

  const handleConvert = (e) => {
    const key = process.env.apikey;
    const currStr =
      basicCurrency && convertCurrency
        ? `${basicCurrency.id}_${convertCurrency.id}`
        : "USD_UAH";
    const url = "https://free.currconv.com/api/v7/convert";
    axios
      .get(`${url}?q=${currStr}&compact=ultra&apiKey=${key}`)
      .then((res) => {
        setConvert((Number(res.data[currStr]) * amount).toFixed(2));
      })
      .catch((err) => {
        setRespErr(err);
      });
  };

  React.useEffect(() => {
    if (respErr) {
      createWarning("Помилка сервера", "Звертайтесь пізніше");
    }
  }, [respErr]);

  const handleInput = (e) => {
    const { pattern, value } = e.target;
    if (new RegExp("^[0-9]*[.]?[0-9]{0,2}$").test(value)) setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { pattern, value } = e.target.closest("form").querySelector("#input");
    if (new RegExp(pattern).test(value)) {
      handleConvert(e);
    } else {
      createWarning("Формат:", "Цілі або десяткові числа (2)");
    }
  };

  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <h2>Конвертер валют</h2>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={4} justify="center">
          <Grid item xs={12} sm={8} md={4}>
            <Grid container spacing={3} justify="center">
              <Grid item xs={12}>
                <label htmlFor="input">Сума</label>
                <TextField
                  // className={classes.input}
                  id="input"
                  size="small"
                  fullWidth
                  // label="Input Amount"
                  variant="outlined"
                  value={amount}
                  onChange={handleInput}
                  type="text"
                  inputProps={{ pattern: "^[0-9]*([.][0-9]{1,2})?$" }}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="currA">Валюта А</label>
                <CurrSelect
                  data={data}
                  currency={basicCurrency}
                  setCurrency={setBasicCurrency}
                  id="currA"
                  helper="За замовчанням USD"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="currB">Валюта Б</label>
                <CurrSelect
                  data={data}
                  currency={convertCurrency}
                  setCurrency={setConvertCurrency}
                  id="currB"
                  helper="За замовчанням UAH"
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <Box component="div" className={classes.button}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Convert
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12}>
                <label htmlFor="result">Результат</label>
                <TextField
                  id="result"
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={convert}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {/* NOTIFICATION */}
      <NotificationContainer />
    </div>
  );
};

export default withLayout(Converter);
