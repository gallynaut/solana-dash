import { useContext } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActions,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Button,
  CardContent,
} from "@material-ui/core";
import AuthContext from "../../contexts/SolanaContext";
import { NETWORKS } from "../../constants";
import lamportsToSol from "../../utils/lamportsToSol";

const NetworkSummaryCard: FC = () => {
  const navigate = useNavigate();
  const { cluster, supply } = useContext(AuthContext);

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
