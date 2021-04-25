import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography } from "@material-ui/core";

const News: FC = () => (
  <>
    <Helmet>
      <title>Dashboard: Account | Solana Dash</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: "background.default",
        minHeight: "100%",
        py: 8,
      }}
    >
      <Typography>Solana News</Typography>
    </Box>
  </>
);

export default News;
