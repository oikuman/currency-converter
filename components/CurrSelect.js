import React from "react";
import { Avatar, InputAdornment, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CurrSelect = ({ data, currency, setCurrency }) => {
  return (
    <Autocomplete
      fullWidth
      value={currency}
      options={data}
      onChange={(event, newValue) => {
        // if (newValue) console.log("new id", newValue.id);
        setCurrency(newValue);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => {
        return option.currencyName;
      }}
      renderOption={(option) => {
        const text = option.currencySymbol || option.id;
        return (
          <>
            <Avatar
              style={{
                color: "orange",
                backgroundColor: "aqua",
                padding: 2,
                margin: 10,
              }}
            >
              {text}
            </Avatar>
            <p>{option.currencyName}</p>
          </>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            startAdornment: currency && (
              <InputAdornment position="start">
                <Avatar
                  style={{
                    color: "orange",
                    backgroundColor: "aqua",
                    padding: 2,
                    margin: 2,
                  }}
                >
                  {currency.currencySymbol || currency.id}
                </Avatar>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default CurrSelect;
