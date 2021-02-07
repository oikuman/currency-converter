import React from "react";
import axios from "axios";
import Currencies from "../components/Currencies";

import { ids } from "../components/data";

export default function Home({ data }) {
  React.useEffect(() => {
    //
    // console.log("data", data);
  }, []);

  return <Currencies data={data} />;
}

export const getStaticProps = async () => {
  try {
    const key = process.env.apikey;
    const res = await axios.get(
      `https://free.currconv.com/api/v7/currencies?apiKey=${key}`
    );

    const all = res.data.results;

    // Pass data to the page via props
    return {
      props: {
        // data: res.data.hits.slice(0, 5),
        data: ids
          .map((item) => {
            return all[item];
          })
          .sort((a, b) =>
            a["currencyName"].localeCompare(b["currencyName"], "en", {
              sensitivity: "base",
            })
          ),
      },
    };
  } catch (err) {
    console.log(err);
    return { props: { err: JSON.stringify(err) } };
  }
};
