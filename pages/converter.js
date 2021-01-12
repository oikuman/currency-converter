import React from "react";

import Converter from "../components/Converter";

const converter = () => {
  return (
    <div>
      <Converter />
    </div>
  );
};

// export async function getStaticProps() {
//   // );

//   try {
//     const res = await axios.get(`http://localhost:3000/api/money`);
//     // const res = await axios.get(`/api/money`);
//     // By returning { props: { posts } }, the Blog component
//     // will receive `posts` as a prop at build time
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
export default converter;
