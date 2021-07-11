import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Grid, Typography } from "@material-ui/core";
import useSettings from "../../../hooks/useSettings";
import gtm from "../../../lib/gtm";
import BeginnerNavButtons from "./BeginnerNavButtons";

const BeginnerSecurity: FC = () => {
  const { settings } = useSettings();

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Solana Dash</title>
      </Helmet>

      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        spacing={3}
        item
        xs={12}
      >
        <Grid item>
          <Typography color="textSecondary" variant="overline">
            Beginner
          </Typography>
          <Typography color="textPrimary" variant="h5">
            How to Secure Your Wallet
          </Typography>
          <Typography color="textSecondary" variant="subtitle2">
            A brief introduction to Solana
          </Typography>
        </Grid>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            p: 8,
            width: "100%",
          }}
        >
          <Typography color="textPrimary" variant="h5">
            Security
          </Typography>
        </Box>
      </Grid>
      <BeginnerNavButtons prev="receive" next={null} />
    </>
  );
};

export default BeginnerSecurity;
