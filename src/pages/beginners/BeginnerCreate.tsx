import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import useSettings from "../../hooks/useSettings";
import ArrowRightIcon from "../../icons/ArrowRight";
import ArrowLeftIcon from "../../icons/ArrowLeft";
import gtm from "../../lib/gtm";
import BeginnerNavButtons from "./BeginnerNavButtons";

const BeginnerCreate: FC = () => {
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
            How to Create a Wallet
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
            Create
          </Typography>
        </Box>
      </Grid>
      <BeginnerNavButtons prev="how" next="connect" />
    </>
  );
};

export default BeginnerCreate;
