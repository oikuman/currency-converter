import React from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@material-ui/core";
import { NotificationContainer } from "react-notifications";
import { format } from "date-fns";
import { createWarning, createSuccess } from "./alerts";
import data from "./data";

const Money = () => {
  const [rates, setRates] = React.useState(null);

  const checkAPI = () => {
    const key = process.env.apiKey;
    const url = "https://free.currconv.com/api/v7/convert";
    axios
      .get(`${url}?apiKey=${key}&q=USD_PHP&compact=ultra`)
      .then((res) => {
        //
        console.log(res.data);
        createSuccess("УРА", "Курс валюти отримано");
      })
      .catch((err) => {
        createWarning("Помилка", "Сервер не працює");
      });
  };
  const handleUpdate = () => {
    // createSuccess("Hello", "From the other side");
    const key = process.env.apiKey;
    const url = "https://free.currconv.com/api/v7/convert";
    const requests = data.map((item) =>
      axios.get(`${url}?q=USD_${item.id}&compact=ultra&apiKey=${key}`)
    );
    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          setRates(responses.map((item) => item.data));
        })
      )
      .catch((err) => {
        setRates(null);
        createWarning("Помилка", "Не вдалося оновити базу валютних курсів");
      });
    //
  };

  React.useEffect(() => {
    if (rates) {
      // console.log(rates);
      const date = format(new Date(), "yyyy-MM-dd");
      const datetime = format(new Date(), "yyyy-MM-dd HH:mm");
      localStorage.setItem("money", JSON.stringify({ date, datetime, rates }));
    }
  }, [rates]);

  React.useEffect(() => {
    let str = localStorage.getItem("money");
    let stored = JSON.parse(str);
    const date = format(new Date(), "yyyy-MM-dd");
    if (stored) {
      //
    }
  }, []);

  return (
    <div>
      <NotificationContainer />
      <Grid container spacing={4} justify="center">
        <Grid item>
          <Button variant="outlined" onClick={checkAPI} disabled>
            Check Api
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="center">
        <Grid item>
          <Button variant="outlined" onClick={handleUpdate} disabled={false}>
            Update
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="center">
        <Grid item>
          <Typography>{format(new Date(), "yyyy-MM-dd")}</Typography>
          <Typography>{format(new Date(), "yyyy-MM-dd HH:mm")}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Money;
