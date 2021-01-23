import React from "react";
import Head from "next/head";
import { Grid } from "@material-ui/core";
// import Header from "./Header";
import NavBar from "./NavBar";
import navButtons from "./buttons";

import styles from "../styles/General.module.css";

const withLayout = (Wrapped) => {
  return (props) => {
    return (
      <div className={styles.general}>
        <Head>
          <title>Currency Converter</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>

        <main className={styles.main}>
          <Grid container spacing={4} justify="center">
            <Grid item xs={4}>
              <NavBar navButtons={navButtons} />
            </Grid>
            <Grid item xs={10}>
              <Wrapped {...props} />
            </Grid>
          </Grid>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
          </a>
        </footer>
      </div>
    );
  };
};

export default withLayout;
