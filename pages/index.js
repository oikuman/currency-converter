import React from "react";
import money from "./money.json";

import Currencies from "../components/Currencies";

export default function Home() {
  React.useEffect(() => {
    localStorage.setItem("money", JSON.stringify(money));
  }, []);

  return <Currencies />;
}

// export async function getStaticProps() {
//   try {
//     const res = await axios.get(`http://localhost:3000/api/money`);
//     // const res = await axios.get(`/api/money`);
//     // Pass data to the page via props
//     return {
//       props: {
//         data: Object.values(res.data).sort((a, b) =>
//           a["currencyName"].localeCompare(b["currencyName"])
//         ),
//       },
//     };
//   } catch (err) {
//     console.log(err);
//     return { props: { err: JSON.stringify(err) } };
//   }
// }
