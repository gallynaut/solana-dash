import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography, Grid } from "@material-ui/core";
import CandleChart from "../components/solana/CandleChart";
import CryptoWatchChart from "../components/trading/CryptoWatchChart";
import SolanaTradingCard from "../components/trading/CryptoWatchCard";
import GoogleTrendsCard from "../components/social/GoogleTrendsCard";

const Test: FC = () => (
  <>
    <Helmet>
      <title>Test | Solana Dash</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        p: 4,
      }}
    >
      <Grid container item sm={12} md={4}>
        <Typography variant="h2">Test</Typography>
        <GoogleTrendsCard />
      </Grid>
    </Box>
  </>
);

export default Test;
