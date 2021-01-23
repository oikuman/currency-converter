import React from "react";
import { Grid } from "@material-ui/core";
import NavButton from "./navButton";

const NavBar = (props) => (
  <Grid container spacing={4} justify="center">
    {props.navButtons.map((button) => (
      <Grid item xs={6} key={button.path}>
        <NavButton path={button.path} label={button.label} icon={button.icon} />
      </Grid>
    ))}
  </Grid>
);

export default NavBar;
