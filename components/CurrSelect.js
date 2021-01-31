import React from "react";
import { Avatar, InputAdornment, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const CurrSelect = ({ data, currency, setCurrency, helper, id, size }) => {
  return (
    <Autocomplete
      fullWidth
      value={currency}
      options={data}
      onChange={(event, newValue) => {
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
                backgroundColor: "#19857b",
                padding: 2,
                margin: 10,
                fontSize: "1rem",
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
          id={id}
          size={size}
          // label="Select"
          variant="outlined"
          helperText={helper}
          InputProps={{
            ...params.InputProps,
            startAdornment: currency && (
              <InputAdornment position="start">
                <Avatar
                  style={{
                    color: "orange",
                    backgroundColor: "#19857b",
                    padding: 2,
                    margin: 10,
                    height: "2rem",
                    width: "2rem",
                  }}
                >
                  <span style={{ fontSize: "1rem" }}>
                    {currency.currencySymbol || currency.id}
                  </span>
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
