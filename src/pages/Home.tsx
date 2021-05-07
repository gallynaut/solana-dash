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
  OverviewWeeklyEarnings,
} from "../components/dashboard/overview";
import useSettings from "../hooks/useSettings";
import ArrowRightIcon from "../icons/ArrowRight";
import BriefcaseIcon from "../icons/Briefcase";
import DownloadIcon from "../icons/Download";
import ExternalLinkIcon from "../icons/ExternalLink";
import InformationCircleIcon from "../icons/InformationCircle";
import PlusIcon from "../icons/Plus";
import UsersIcon from "../icons/Users";
import CryptoWatchCard from "../components/trading/CryptoWatchCard";
import GeckoPriceCard from "../components/gecko/GeckoPriceCard";
import SocialCard from "../components/social/SocialCard";
import GoogleTrendsCard from "../components/GoogleTrendsCard";

const Home: FC = () => {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>Home | Solana Dash</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 6,
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
              <Grid item md={3}>
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
              <Grid item md={9}>
                <GeckoPriceCard />
              </Grid>
            </Grid>
            <Grid item md={8} xs={12}>
              {/* WALLET / TOKEN OVERVIEW - LINKS TO ACCOUNT PAGE */}
              <CryptoWatchCard />
            </Grid>
            <Grid item md={4} xs={12}>
              <SocialCard />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
