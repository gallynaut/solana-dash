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
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import AuthContext from "../../contexts/SolanaContext";
import { NETWORKS } from "../../constants";
import shortenPublicKey from "../../utils/shortenPublicKey";
import SolanaGradientIcon from "../../icons/SolanaGradient";
import ArrowRightIcon from "../../icons/ArrowRight";
import BriefcaseIcon from "../../icons/Briefcase";
import SolanaIcon from "../../icons/Solana";
import lamportsToSol from "../../utils/lamportsToSol";

const NetworkSummaryCard: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { isAuthenticated, publicKey, cluster, supply } = useContext(
    AuthContext
  );
  const gotoNetwork = (): void => {
    navigate("/network");
  };

  const circ: string =
    supply !== null ? lamportsToSol(supply.circulating, "M") : "N/A";
  const total: string =
    supply !== null ? lamportsToSol(supply.total, "M") : "N/A";

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: "50px",
        }}
      >
        <CardActions
          sx={{
            backgroundColor: "background.default",
          }}
        >
          <Button size="small">
            <CardHeader title={NETWORKS[cluster].label} sx={{ pb: 0 }} />
          </Button>
        </CardActions>
        <CardContent>
          <Grid
            alignItems="center"
            container
            justifyContent="space-between"
            spacing={1}
            item
            xs={12}
          >
            <Grid item md={12}>
              <Typography color="textSecondary" variant="body2" gutterBottom>
                Supply
              </Typography>
              <Divider />
            </Grid>

            <Grid item md={5}>
              <Typography color="textPrimary" variant="body1">
                {circ}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                /
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography color="textPrimary" variant="body1">
                {total}
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography color="textSecondary" variant="body2">
                Circulating
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body2">
                /
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography color="textSecondary" variant="body2">
                Total
              </Typography>
            </Grid>
            {/* ------------------------  */}
            <Grid item md={12}>
              <Typography
                color="textSecondary"
                variant="body2"
                gutterBottom
                sx={{ mt: 1 }}
              >
                Marketcap
              </Typography>
              <Divider />
            </Grid>
            <Grid item md={5}>
              <Typography color="textPrimary" variant="body1">
                {circ}
              </Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary" variant="body1">
                /
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography color="textPrimary" variant="body1">
                {total}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default NetworkSummaryCard;
