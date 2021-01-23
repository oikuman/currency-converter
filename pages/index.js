import React from "react";
import axios from "axios";
import Currencies from "../components/Currencies";

export default function Home({ data }) {
  React.useEffect(() => {
    //
    console.log("data", data);
  }, []);

  return <Currencies />;
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get(
      `https://hn.algolia.com/api/v1/search?query=python`
    );

    // Pass data to the page via props
    return {
      props: {
        data: res.data.hits.slice(0, 5),
      },
    };
  } catch (err) {
    console.log(err);
    return { props: { err: JSON.stringify(err) } };
  }
};
