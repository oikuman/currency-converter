import React from "react";
import axios from "axios";
import { format } from "date-fns";
import { Grid, Tooltip, Fab, Avatar, Typography } from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import { makeStyles } from "@material-ui/core/styles";

import CurrSelect from "../components/CurrSelect";
import withLayout from "./withLayout";
// import data from "./data";

import { NotificationContainer } from "react-notifications";
// import { createWarning, createSuccess } from "./alerts";

import Updater from "./Updater";

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: "1.5rem",
    textAlign: "left",
  },
  rate: {
    fontSize: "1.5rem",
    textAlign: "center",
  },
}));

const Currencies = ({ data }) => {
  const classes = useStyles();
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [rates, setRates] = React.useState(null);
  const [general, setGeneral] = React.useState(data ? [...data] : []);
  const [selected, setSelected] = React.useState([]);

  const found = (array, id) => {
    return array.find((item) => item.id === id);
  };

  const removed = (array, id) => {
    return array.reduce((acc, item) => {
      if (item.id !== id) return [...acc, item];
      return [...acc];
    }, []);
  };

  const sorted = (array) => {
    return array.sort((a, b) =>
      a["currencyName"].localeCompare(b["currencyName"], "en", {
        sensitivity: "base",
      })
    );
  };

  const handleSelect = (e) => {
    setSelected(
      sorted([...selected, found(general, e.currentTarget.dataset.id)])
    );
    setGeneral(sorted([...removed(general, e.currentTarget.dataset.id)]));
  };

  const handleDeselect = (e) => {
    setGeneral(
      sorted([...general, found(selected, e.currentTarget.dataset.id)])
    );
    setSelected(sorted([...removed(selected, e.currentTarget.dataset.id)]));
  };

  React.useEffect(() => {
    const money = JSON.parse(localStorage.getItem("money"));
    if (money) setRates(money.rates);
  }, []);

  return (
    <div>
      <Updater rates={rates} setRates={setRates} />
      <Grid container spacing={4} justify="center">
        <Grid item xs={10} md={6}>
          <CurrSelect
            data={data ? [...data] : []}
            currency={basicCurrency}
            setCurrency={setBasicCurrency}
            helper="Оберіть базову валюту. За замовченням USD"
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="center">
        <Grid item>
          {selected.length > 0 && (
            <Typography variant="h3" gutterBottom>
              Favourites
            </Typography>
          )}
        </Grid>
      </Grid>
      <List>
        {selected &&
          selected.map((item) => (
            <ListItem key={item.id}>
              <Grid container spacing={4} justify="center" alignItems="center">
                <Grid item xs={2}>
                  <ListItemAvatar>
                    <Avatar>{item.currencySymbol || item.id}</Avatar>
                  </ListItemAvatar>
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    classes={{
                      primary: classes.name,
                    }}
                    primary={item.currencyName}
                  />
                </Grid>
                <Grid item xs={4}>
                  <ListItemText
                    classes={{
                      primary: classes.rate,
                    }}
                    // rates
                    primary={
                      rates && basicCurrency
                        ? (
                            rates.find((rate) => rate[`USD_${item.id}`])[
                              `USD_${item.id}`
                            ] /
                            rates.find(
                              (rate) => rate[`USD_${basicCurrency.id}`]
                            )[`USD_${basicCurrency.id}`]
                          ).toFixed(4)
                        : rates
                        ? rates
                            .find((rate) => rate[`USD_${item.id}`])
                            [`USD_${item.id}`].toFixed(4)
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <ListItemIcon>
                    <Tooltip title="Remove from Favourites">
                      <Fab
                        color="secondary"
                        aria-label="delete"
                        data-id={item.id}
                        onClick={handleDeselect}
                      >
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </ListItemIcon>
                </Grid>
              </Grid>
            </ListItem>
          ))}
      </List>

      <Grid container spacing={4} justify="center">
        <Grid item>
          <Typography variant="h3" gutterBottom>
            {selected.length > 0 ? "Other" : "Currency List"}
          </Typography>
        </Grid>
      </Grid>

      <List>
        {general
          ? general.map((item) => {
              return (
                <ListItem key={item.id}>
                  <Grid
                    container
                    spacing={4}
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={2}>
                      <ListItemAvatar>
                        <Avatar style={{ padding: 5 }}>
                          {item.currencySymbol || item.id}
                        </Avatar>
                      </ListItemAvatar>
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText
                        classes={{
                          primary: classes.name,
                        }}
                        primary={item.currencyName}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <ListItemText
                        classes={{
                          primary: classes.rate,
                        }}
                        // rates
                        primary={
                          rates && basicCurrency
                            ? (
                                rates.find((rate) => rate[`USD_${item.id}`])[
                                  `USD_${item.id}`
                                ] /
                                rates.find(
                                  (rate) => rate[`USD_${basicCurrency.id}`]
                                )[`USD_${basicCurrency.id}`]
                              ).toFixed(4)
                            : rates
                            ? rates
                                .find((rate) => rate[`USD_${item.id}`])
                                [`USD_${item.id}`].toFixed(4)
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={2}>
                      <ListItemIcon>
                        <Tooltip title="Add to Favourites">
                          <Fab
                            color="primary"
                            aria-label="add"
                            data-id={item.id}
                            onClick={handleSelect}
                          >
                            <AddIcon />
                          </Fab>
                        </Tooltip>
                      </ListItemIcon>
                    </Grid>
                  </Grid>
                </ListItem>
              );
            })
          : null}
      </List>

      <NotificationContainer />
    </div>
  );
};

export default withLayout(Currencies);
