import React from "react";
import axios from "axios";
import { NotificationContainer } from "react-notifications";

import { Grid, TextField, Button, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import CurrSelect from "../components/CurrSelect";
import withLayout from "./withLayout";
import data from "./data";

import { createWarning, createSuccess } from "./alerts";

const useStyles = makeStyles((theme) => ({
  input: {},
}));

const Converter = () => {
  const classes = useStyles();
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [convertCurrency, setConvertCurrency] = React.useState(null);
  const [amount, setAmount] = React.useState(0);
  const [convert, setConvert] = React.useState(0);
  // console.log(data);
  //

  // React.useEffect(() => {
  // }, []);

  const handleConvert = (e) => {
    const key = process.env.apiKey;
    const currStr =
      basicCurrency && convertCurrency
        ? `${basicCurrency.id}_${convertCurrency.id}`
        : "USD_UAH";
    const url = "https://free.currconv.com/api/v7/convert";
    // const url = "https://free.crrconv.com/api/v7/convert";
    axios
      .get(`${url}?q=${currStr}&compact=ultra&apiKey=${key}`)
      .then((res) => {
        console.log(res.data[currStr]);
        setConvert((Number(res.data[currStr]) * amount).toFixed(2));
      })
      .catch((err) => {
        createWarning();
      });
  };

  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSuccess = (e) => {
    createSuccess("Ви на зв'язку", "Підтверджено");
  };

  return (
    <div>
      {/* NOTIFICATION */}
      <NotificationContainer />
      <Grid container spacing={3} justify="center">
        <Grid item>
          <h2>Конвертер валют</h2>
        </Grid>
      </Grid>

      <Grid container spacing={3} justify="center">
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleSuccess}>
            Успіх
          </Button>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={2}>
            <TextField
              // className={classes.input}
              fullWidth
              label="Input Amount"
              variant="outlined"
              value={amount}
              onChange={handleInput}
              type="text"
              inputProps={{ type: "text", pattern: "^\\d\\.*$" }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CurrSelect
              data={data}
              currency={basicCurrency}
              setCurrency={setBasicCurrency}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <CurrSelect
              data={data}
              currency={convertCurrency}
              setCurrency={setConvertCurrency}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConvert}
              type="submit"
            >
              Convert
            </Button>
          </Grid>

          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              variant="outlined"
              value={convert}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <Typography>
            Розраховано за попередньо отриманими даними з сервера
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withLayout(Converter);
