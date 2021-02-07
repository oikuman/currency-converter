import React from "react";
import axios from "axios";
import { Grid, Button, Typography } from "@material-ui/core";
import { NotificationContainer } from "react-notifications";
import { format } from "date-fns";
import { createWarning, createSuccess } from "./alerts";
import data from "./data";

const Updater = ({ rates, setRates }) => {
  const [datetime, setDatetime] = React.useState(null);
  const [update, setUpdate] = React.useState(false);

  const handleUpdate = () => {
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
          setUpdate(true);
          setUpdate(false);
        })
      )
      .catch((err) => {
        createWarning("Помилка сервера", "Звертайтесь пізніше");
      });
  };

  React.useEffect(() => {
    let stored = JSON.parse(localStorage.getItem("money"));

    if (!stored) {
      handleUpdate();
    } else {
      setDatetime(stored.datetime);
      setRates(stored.rates);
    }
  }, []);

  React.useEffect(() => {
    if (update && rates) {
      const currDate = format(new Date(), "yyyy-MM-dd");
      const currDatetime = format(new Date(), "yyyy-MM-dd HH:mm");
      setDatetime(currDatetime);
      localStorage.setItem(
        "money",
        JSON.stringify({ currDate, currDatetime, rates })
      );
    }
  }, [update]);

  return (
    <div>
      <Grid container spacing={4} justify="center">
        <Grid item>
          <Button variant="outlined" onClick={handleUpdate}>
            Update Rates
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="center">
        <Grid item>
          <Typography>
            {datetime && `За даними валютних курсів станом на ${datetime}`}
          </Typography>
        </Grid>
      </Grid>
      <NotificationContainer />
    </div>
  );
};

export default Updater;
