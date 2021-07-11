import { useRef, useContext } from "react";
import type { FC } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns";
import {
  Box,
  Card,
  CardHeader,
  Typography,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Scrollbar from "../general/Scrollbar";
import SolanaGradientIcon from "../../icons/SolanaGradient";
import AuthContext from "../../contexts/SolanaContext";
import PublicKeyButton from "./PublicKeyButton";

const OverviewAccount: FC = (props) => {
  const theme = useTheme();
  const { isAuthenticated, publicKey, cluster, balance } = useContext(
    AuthContext
  );

  return (
    <Card {...props}>
      <CardHeader
        component="span"
        avatar={<SolanaGradientIcon sx={{ fontSize: "4em" }} />}
        title="Account Overview"
        sx={{ px: 3 }}
        subheader={<PublicKeyButton />}
      />
      <Divider variant="middle" />
      <Scrollbar>
        <Box
          sx={{
            minHeight: 300,
            px: 2,
          }}
        />
      </Scrollbar>
    </Card>
  );
};

export default OverviewAccount;
