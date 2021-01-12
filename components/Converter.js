import React from "react";
import axios from "axios";
import shortid from "shortid";
import Link from "next/link";

import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Avatar,
  Typography,
} from "@material-ui/core";

import CurrSelect from "../components/CurrSelect";
import withLayout from "./withLayout";
import data from "./data";

const Converter = () => {
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [convertCurrency, setConvertCurrency] = React.useState(null);

  const [amount, setAmount] = React.useState(0);
  const [convert, setConvert] = React.useState(0);
  // console.log(data);
  //
  const handleConvert = (e) => {
    const key = process.env.apiKey;
    const currStr =
      basicCurrency && convertCurrency
        ? `${basicCurrency.id}_${convertCurrency.id}`
        : "USD_UAH";
    const url = "https://free.currconv.com/api/v7/convert";
    axios.get(`${url}?q=${currStr}&compact=ultra&apiKey=${key}`).then((res) => {
      console.log(res.data[currStr]);
      setConvert((Number(res.data[currStr]) * amount).toFixed(2));
    });
  };

  const handleInput = (e) => {
    setAmount(Number(e.target.value));
  };

  const handleSelect = (e) => {};

  const handleSubmit = (e) => {};

  return (
    <div>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <h2>Конвертер валют</h2>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify="center">
          <Grid item xs={2}>
            <TextField
              id="input"
              label="Input Amount"
              variant="outlined"
              value={amount}
              onChange={handleInput}
              type="number"
            />
          </Grid>
          <Grid item xs={3}>
            <CurrSelect
              data={data}
              currency={basicCurrency}
              setCurrency={setBasicCurrency}
            />
          </Grid>
          <Grid item xs={3}>
            <CurrSelect
              data={data}
              currency={convertCurrency}
              setCurrency={setConvertCurrency}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              id="button"
              variant="contained"
              color="primary"
              onClick={handleConvert}
            >
              Convert
            </Button>
          </Grid>

          <Grid item xs={2}>
            <Typography>{convert}</Typography>
          </Grid>
        </Grid>
      </form>
      <Grid container spacing={3} justify="center">
        <Grid item>
          <Typography>Additional Info</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default withLayout(Converter);
