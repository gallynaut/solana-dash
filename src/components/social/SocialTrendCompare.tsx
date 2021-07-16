import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { Typography, Box } from "@material-ui/core";
import API from "../../Axios";

const SocialTrendCompare: FC = () => {
  const [sol, setSol] = useState(null);
  // const fetchGecko = async (symbol: string): Promise<void> => {
  //   try {
  //     const result = await API.get(`gecko/${symbol}`);
  //     console.log("GECKO: ", result.data);
  //     setSol(result.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.data.errors);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       /*
  //        * The request was made but no response was received, `error.request`
  //        * is an instance of XMLHttpRequest in the browser and an instance
  //        * of http.ClientRequest in Node.js
  //        */
  //       console.log(error.request);
  //     } else {
  //       console.log("Error", error.message);
  //     }
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const symbol = "solana";
    // console.log("SSSSOOOOLLLL");
    // API.get(`gecko/${symbol}`).then((res) => {
    //   const resp = res.data;
    //   console.log("setting state ", resp);
    //   setSol(resp.id);
    // });
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        height: 100,
        width: 100,
        backgroundColor: "background.default",
        py: 4,
      }}
    >
      {" "}
      <Typography variant="h1">{sol !== null ? sol : "None"}</Typography>
    </Box>
  );
};

export default SocialTrendCompare;
