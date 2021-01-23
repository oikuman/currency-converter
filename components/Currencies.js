import React from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  Grid,
  Tooltip,
  Fab,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
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
import data from "./data";

import { NotificationContainer } from "react-notifications";
import { createWarning, createSuccess } from "./alerts";

import Money from "./Money";

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

const Currencies = () => {
  const classes = useStyles();
  // console.log(data);
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [rates, setRates] = React.useState(null);
  const [general, setGeneral] = React.useState([...data]);
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

  const getDate = () => format(new Date(), "yyyy-MM-dd");

  const handleSelect = (e) => {
    // console.log("id", e.currentTarget.dataset.id);
    setSelected(
      sorted([...selected, found(general, e.currentTarget.dataset.id)])
    );
    setGeneral(sorted([...removed(general, e.currentTarget.dataset.id)]));
  };

  const handleDeselect = (e) => {
    // console.log("id", e.currentTarget.dataset.id);
    setGeneral(
      sorted([...general, found(selected, e.currentTarget.dataset.id)])
    );
    setSelected(sorted([...removed(selected, e.currentTarget.dataset.id)]));
  };

  const findExRate = (curr, otherCurr) => {
    //
  };

  const checkAPI = () => {
    //
  };

  const updateMoney = () => {
    //
  };

  const handleUpdate = () => {
    updateMoney();
    // clearMoney();
  };

  const clearMoney = () => {
    localStorage.removeItem("money");
  };

  const getMoney = () => {
    updateMoney();
    return JSON.parse(localStorage.getItem("money"));
  };
  const getFromMoney = (str) => {
    let money = JSON.parse(localStorage.getItem("money"));
    if (money) return money.str;
    return null;
  };

  React.useEffect(() => {
    // console.log("Current date:", getDate());
    // console.log(JSON.parse(localStorage.getItem("money")).rates);
    // setRates(JSON.parse(localStorage.getItem("money")).rates);
  }, []);

  // React.useEffect(() => {

  // }, []);

  return (
    <div>
      {/* NOTIFICATION */}
      <Money />
      <NotificationContainer />

      <Grid container spacing={4} justify="center">
        <Grid item xs={10} md={6}>
          <CurrSelect
            data={data}
            currency={basicCurrency}
            setCurrency={setBasicCurrency}
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
              // const rate = getFromMoney(`USD_${item.id}`);
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
    </div>
  );
};

export default withLayout(Currencies);
