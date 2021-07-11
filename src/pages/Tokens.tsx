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
import { TokenListProvider, TokenInfo } from "@solana/spl-token-registry";
import {
  OverviewInbox,
  OverviewPrivateWallet,
  OverviewTotalBalance,
  OverviewAccount,
} from "../components/dashboard";
import useSettings from "../hooks/useSettings";
import ArrowRightIcon from "../icons/ArrowRight";
import BriefcaseIcon from "../icons/Briefcase";
import DownloadIcon from "../icons/Download";
import ExternalLinkIcon from "../icons/ExternalLink";
import InformationCircleIcon from "../icons/InformationCircle";
import PlusIcon from "../icons/Plus";
import UsersIcon from "../icons/Users";
import TokenSummaryCard from "../components/tokens/TokenSummaryCard";

const Tokens: FC = () => {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>Tokens | Solana Dash</title>
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
                  Tokens
                </Typography>
                <Typography color="textSecondary" variant="subtitle2">
                  List of Tokens on Solana
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Tokens;
