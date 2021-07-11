import { useRef, useContext } from "react";
import type { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  IconButton,
  CardContent,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { formatTimeStr } from "antd/lib/statistic/utils";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import AuthContext from "../../contexts/SolanaContext";
import { NETWORKS } from "../../constants";
import shortenPublicKey from "../../utils/shortenPublicKey";
import SolanaGradientIcon from "../../icons/SolanaGradient";
import ArrowRightIcon from "../../icons/ArrowRight";
import BriefcaseIcon from "../../icons/Briefcase";
import SolanaIcon from "../../icons/Solana";

const AccountSummaryCard: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { isAuthenticated, publicKey, cluster, balance } = useContext(
    AuthContext
  );
  const gotoAccount = (): void => {
    navigate("/account");
  };

  const pkStr: string = isAuthenticated
    ? shortenPublicKey(publicKey, 4, 8)
    : "Connect Account";

  const solBalance: ReactJSXElement =
    balance != null ? (
      <Button color="primary" variant="text" onClick={gotoAccount}>
        {(balance.value * 10 ** -9).toFixed(5)} SOL
      </Button>
    ) : (
      <Typography color="primary" variant="body1">
        N/A
      </Typography>
    );

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: "50px",
        }}
      >
        <CardActions
          onClick={gotoAccount}
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <Button size="small">
            <CardHeader
              disableTypography
              // subheader={
              //   <Typography color="textPrimary" variant="h6">
              //     TBD Solana Balance
              //   </Typography>
              // }
              title={
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <SolanaIcon color="primary" />
                  <Typography color="textPrimary" sx={{ pl: 1 }} variant="h6">
                    {pkStr}
                  </Typography>
                </Box>
              }
              sx={{ pb: 0 }}
            />
          </Button>
        </CardActions>
        <CardContent sx={{ pt: "8px" }}>
          <Typography color="textSecondary" variant="body2">
            This is where your solana balance and past performance is displayed
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            backgroundColor: "background.default",
            p: 1,
          }}
        >
          <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={3}
            item
            xs={12}
          >
            {isAuthenticated ? <Grid item>{solBalance}</Grid> : <></>}
            <Grid item>
              <Typography color="primary" variant="body2">
                {NETWORKS[cluster].label}
              </Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default AccountSummaryCard;
