import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Grid, Box } from "@material-ui/core";
import Link from "next/link";

import Rates from "../components/Rates";
import Converter from "../components/Converter";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Simple Convertation App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Купівля-продаж валюти</h1>

        <Grid container spacing={4} justify="center">
          <Grid item xs={12} md={12}>
            <div style={{ textAlign: "center" }}>
              <Link href="/currencies">
                <a>Currencies</a>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Rates />
          </Grid>
          <Grid item xs={12} md={6}>
            <Converter />
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
}
