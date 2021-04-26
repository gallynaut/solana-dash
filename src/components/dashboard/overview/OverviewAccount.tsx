import type { FC } from "react";
import Chart from "react-apexcharts";
import { format } from "date-fns";
import { Box, Card, CardHeader, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import Scrollbar from "../../Scrollbar";
import SolanaGradientIcon from "../../../icons/SolanaGradient";

const OverviewAccount: FC = (props) => {
  const theme = useTheme();

  return (
    <Card {...props}>
      <CardHeader
        subheader={
          <Typography color="textSecondary" variant="body2">
            {format(new Date(), "MMM yyyy")}
          </Typography>
        }
        title="Account Overview"
      />
      <Scrollbar>
        <Box
          sx={{
            height: 336,
            minWidth: 500,
            px: 2,
          }}
        >
          <SolanaGradientIcon sx={{ fontSize: "4em" }} />
        </Box>
      </Scrollbar>
    </Card>
  );
};

export default OverviewAccount;
