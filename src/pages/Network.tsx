import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Typography } from "@material-ui/core";

const Network: FC = () => (
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
      <Typography>Network Overview</Typography>
    </Box>
  </>
);

export default Network;
