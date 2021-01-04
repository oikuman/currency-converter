import React from "react";
import axios from "axios";

import styles from "../styles/General.module.css";

const Currencies = ({ data }) => {
  console.log(data);
  return <div className={styles.general}>Currencies</div>;
};

export async function getServerSideProps() {
  // Fetch data from external API

  const key = process.env.apiKey;
  const res = await axios.get(
    `https://free.currconv.com/api/v7/currencies?apiKey=${key}`
  );

  // Pass data to the page via props
  return { props: { data: res.data } };
}

export default Currencies;
