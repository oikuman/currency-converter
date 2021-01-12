import React from "react";
import axios from "axios";
import {
  Grid,
  IconButton,
  Tooltip,
  Fab,
  Avatar,
  Typography,
  TextField,
} from "@material-ui/core";
import { List, ListItem, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";

import CurrSelect from "../components/CurrSelect";
import withLayout from "./withLayout";
import data from "./data";

const Currencies = () => {
  // console.log(data);
  const [basicCurrency, setBasicCurrency] = React.useState(null);
  const [money, setMoney] = React.useState(null);

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

  const handleClick = (e) => {
    //
    console.log("id", e.currentTarget.dataset.id);
    findExRate({ id: "USD" }, { id: e.currentTarget.dataset.id });
  };

  const processData = () => {
    //
  };

  const getMoney = () => {
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
        <h2>Currency List</h2>
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

      <List>
        {data
          ? data.map((item) => {
              // const rate = getFromMoney(`USD_${item.id}`);
              return (
                <li key={item.id}>
                  <div>
                    <Grid container spacing={4}>
                      <Grid item xs={2}>
                        <span>
                          <Avatar style={{ padding: 5 }}>
                            {item.currencySymbol || item.id}
                          </Avatar>
                        </span>
                      </Grid>
                      <Grid item xs={4}>
                        <span>{item.currencyName}</span>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography color="secondary">
                          {money && basicCurrency
                            ? (
                                money[`USD_${item.id}`] /
                                money[`USD_${basicCurrency.id}`]
                              ).toFixed(4)
                            : money
                            ? money[`USD_${item.id}`].toFixed(4)
                            : null}
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Tooltip title="Add to Favourites">
                          <Fab
                            color="primary"
                            aria-label="add"
                            data-id={item.id}
                            onClick={handleClick}
                          >
                            <AddIcon />
                          </Fab>
                        </Tooltip>
                      </Grid>

                      {/* <Grid item xs={2}>
                    <Tooltip title="Remove from Favourites">
                      <Fab color="secondary" aria-label="delete">
                        <DeleteIcon />
                      </Fab>
                    </Tooltip>
                  </Grid> */}
                    </Grid>
                  </div>
                </li>
              );
            })
          : err}
      </List>
    </div>
  );
};

export default withLayout(Currencies);
