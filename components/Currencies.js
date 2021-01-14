import React from "react";
import axios from "axios";
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

// const useStyles = makeStyles((theme) => ({
//   text: {
//     fontSize: "11rem",
//   },
// }));

const Currencies = () => {
  // const classes = useStyles();
  // console.log(data);
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [money, setMoney] = React.useState(null);
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

  // setSelected(added(selected,));

  const saveToLocalStorage = (obj) => {
    let str = localStorage.getItem("money");
    let money = JSON.parse(str);
    money = { ...money, ...obj };
    localStorage.setItem("money", JSON.stringify(money));
  };

  const findExRate = (curr, otherCurr) => {
    const key = process.env.apiKey;
    const currStr = `${curr.id}_${otherCurr.id}`;
    console.log(currStr);
    const url = "https://free.currconv.com/api/v7/convert";
    axios
      .get(`${url}?q=${currStr}&compact=ultra&apiKey=${key}`)
      .then((res) => {
        console.log(res.data[currStr]);
        saveToLocalStorage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateMoney = () => {
    if (data) {
      data.forEach((item) => {
        findExRate({ id: "USD" }, item);
      });
    }
  };

  const handleUpdate = () => {
    updateMoney();
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
    setMoney(JSON.parse(localStorage.getItem("money")));
  }, []);

  // React.useEffect(() => {

  // }, []);

  return (
    <div>
      <Grid container spacing={4} justify="center">
        <Grid item>
          <Button variant="outlined" onClick={handleUpdate}>
            Update
          </Button>
        </Grid>
      </Grid>
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
              <ListItemAvatar>
                <Avatar>{item.currencySymbol || item.id}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.currencyName} />
              <ListItemText
                primary={
                  money && basicCurrency
                    ? (
                        money[`USD_${item.id}`] /
                        money[`USD_${basicCurrency.id}`]
                      ).toFixed(4)
                    : money
                    ? money[`USD_${item.id}`].toFixed(4)
                    : null
                }
              />
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
                  <ListItemAvatar>
                    <Avatar style={{ padding: 5 }}>
                      {item.currencySymbol || item.id}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={item.currencyName} />
                  <ListItemText
                    primary={
                      money && basicCurrency
                        ? (
                            money[`USD_${item.id}`] /
                            money[`USD_${basicCurrency.id}`]
                          ).toFixed(4)
                        : money
                        ? money[`USD_${item.id}`].toFixed(4)
                        : null
                    }
                  />
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
                </ListItem>
              );
            })
          : err}
      </List>
    </div>
  );
};

export default withLayout(Currencies);
