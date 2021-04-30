import type { FC } from "react";
import numeral from "numeral";
import Chart from "react-apexcharts";
import { Box, Grid, Typography, Card, CardHeader } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

const ChartLine: FC = () => {
  const theme = useTheme();

  const chart = {
    options: {
      chart: {
        background: "transparent",
        stacked: false,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#7783DB"],
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      theme: {
        mode: theme.palette.mode,
      },
      tooltip: {
        enabled: false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
    },
    series: [
      {
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
    ],
  };

  return <Chart type="line" {...chart} />;
};

const data = {
  sales: {
    actualYear: 152996,
    lastYear: 121420,
  },
  profit: {
    actualYear: 32100,
    lastYear: 25200,
  },
  cost: {
    actualYear: 99700,
    lastYear: 68300,
  },
};

const SocialCard: FC = () => (
  <Box
    sx={{
      backgroundColor: "background.default",
    }}
  >
    <Card>
      <CardHeader
        title="Social"
        subheader={
          <Typography color="textSecondary" variant="body2">
            Latest social media trends
          </Typography>
        }
      />
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography color="textSecondary" variant="overline">
              Google
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {numeral(data.profit.actualYear).format("$0,0.00")}
            </Typography>
            <Typography color="textSecondary" variant="caption" component="div">
              1D - +0.43%
            </Typography>
            <Typography color="textSecondary" variant="caption" component="div">
              1W - +3.43%
            </Typography>
            <Typography color="textSecondary" variant="caption" component="div">
              1M - +33.43%
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              height: 54,
              width: 177,
            }}
          >
            <ChartLine />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            border: (theme) => ({
              xs: `1px solid ${theme.palette.divider}`,
            }),
            display: "flex",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <div>
            <Typography color="textSecondary" variant="overline">
              Twitter
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {numeral(data.cost.actualYear).format("$0,0.00")}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              vs.
              {numeral(data.cost.lastYear).format("$0,0.00")}
              &nbsp; last year
            </Typography>
          </div>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              height: 54,
              width: 177,
            }}
          >
            <ChartLine />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography color="textSecondary" variant="overline">
              Token Trends
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {numeral(data.profit.actualYear).format("$0,0.00")}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              vs.
              {numeral(data.profit.lastYear).format("$0,0.00")}
              &nbsp; last year
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              height: 54,
              width: 177,
            }}
          >
            <ChartLine />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            <Typography color="textSecondary" variant="overline">
              Coin Gecko
            </Typography>
            <Typography color="textPrimary" variant="h5">
              {numeral(data.profit.actualYear).format("$0,0.00")}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              vs.
              {numeral(data.profit.lastYear).format("$0,0.00")}
              &nbsp; last year
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              height: 54,
              width: 177,
            }}
          >
            <ChartLine />
          </Box>
        </Grid>
      </Grid>
    </Card>
  </Box>
);

export default SocialCard;
