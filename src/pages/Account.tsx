import { useEffect } from "react";
import type { FC } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import {
  OverviewInbox,
  OverviewPrivateWallet,
  OverviewTotalBalance,
  OverviewAccount,
} from "../components/dashboard/overview";
import useSettings from "../hooks/useSettings";
import ArrowRightIcon from "../icons/ArrowRight";
import BriefcaseIcon from "../icons/Briefcase";
import DownloadIcon from "../icons/Download";
import ExternalLinkIcon from "../icons/ExternalLink";
import InformationCircleIcon from "../icons/InformationCircle";
import PlusIcon from "../icons/Plus";
import UsersIcon from "../icons/Users";

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
                <Typography color="textSecondary" variant="overline">
                  Home
                </Typography>
                <Typography color="textPrimary" variant="h5">
                  Welcome to Solana Dash
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  Here&apos;s what&apos;s happening with Solana today
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
              <OverviewTotalBalance />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
