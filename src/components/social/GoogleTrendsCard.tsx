import type { FC } from "react";
import { useRef, useState } from "react";
import { Card, CardHeader, Typography, CardContent } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import GoogleTrends from "./GoogleTrends";

const GoogleTrendsCard: FC = () => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Card
        sx={{
          width: "100%",
          height: "500px",
        }}
      >
        <CardHeader
          ref={anchorRef}
          title="Google"
          subheader={
            <Typography color="textSecondary" variant="body2">
              Solana
            </Typography>
          }
        />
        <CardContent>
          <div id="google-trends-widget">
            <GoogleTrends
              type="TIMESERIES"
              keyword="Solana"
              url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
            />
            <GoogleTrends
              type="GEO_MAP"
              keyword="Solana"
              url="https://ssl.gstatic.com/trends_nrtr/2051_RC11/embed_loader.js"
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default GoogleTrendsCard;
