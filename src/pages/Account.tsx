import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import OverviewAccount from "../components/account/OverviewAccount";
import useSettings from "../hooks/useSettings";
import PlusIcon from "../icons/Plus";
import AccountTokenSummaryCard from "../components/account/AccountTokenSummaryCard";

const Account: FC = () => {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>Account | Solana Dash</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={settings.compact ? "xl" : false}>
          <Grid container spacing={3}>
            <Grid
              alignItems="center"
              container
              justifyContent="space-between"
              spacing={3}
              item
              xs={12}
            >
              <Grid item>
                <Typography color="textPrimary" variant="h5">
                  Account
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Account Summary and Transactions
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                >
                  New Transaction
                </Button>
              </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
              {/* WALLET / TOKEN OVERVIEW - LINKS TO ACCOUNT PAGE */}
              <OverviewAccount />
            </Grid>
            <Grid item md={4} xs={12}>
              {/* SOLANA NETWORK OVERVIEW - LINKS TO NETWORK PAGE */}
              <AccountTokenSummaryCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
