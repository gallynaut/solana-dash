import type { FC } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import useSettings from "../hooks/useSettings";
import useTokens from "../hooks/useTokens";
import TokenTable from "../components/tokens/TokenTable";

const Tokens: FC = () => {
  const { settings } = useSettings();
  const { tokens, fetchTokens } = useTokens();

  const handleRefresh = () => {
    console.log("fetccchiiing");
    fetchTokens();
  };

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
              <IconButton
                color="primary"
                aria-label="refresh tokens"
                component="span"
                onClick={handleRefresh}
              >
                <RefreshIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Divider sx={{ py: "1em" }} />
          <TokenTable tokens={tokens.mainnetBeta} />
        </Container>
      </Box>
    </>
  );
};

export default Tokens;
