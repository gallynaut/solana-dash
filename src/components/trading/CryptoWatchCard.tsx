import type { FC } from "react";
import { useRef, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  Grid,
  MenuItem,
  Popover,
  Typography,
  CardContent,
} from "@material-ui/core";
import useMarket from "../../hooks/useMarket";
import CryptoWatchChart from "./CryptoWatchChart";
import { EXCHANGES } from "../../constants";
import useSettings from "../../hooks/useSettings";
import LightChartThemeSelect from "./LightChartThemeSelect";

const CryptoWatchCard: FC = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { exchange, setExchange, symbol, setSymbol } = useMarket();
  const { settings } = useSettings();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleChangeMarket = (newExchange: string, newSymbol: string): void => {
    if (newExchange !== exchange || newSymbol !== symbol) {
      console.log("setting market ", `${newExchange}-${newSymbol}`);
      setExchange(newExchange);
      setSymbol(newSymbol);
    }
    setOpen(false);
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          minHeight: "500px",
        }}
      >
        <Grid
          container
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid item md={8}>
            <CardActions onClick={handleOpen}>
              <CardHeader
                ref={anchorRef}
                title="Markets"
                subheader={
                  <Typography color="textSecondary" variant="body2">
                    {exchange.toUpperCase()} - {symbol.toUpperCase()}
                  </Typography>
                }
              />
            </CardActions>
          </Grid>
          <Grid item md={4}>
            <LightChartThemeSelect />
          </Grid>
        </Grid>
        <CardContent>
          <Popover
            anchorEl={anchorRef.current}
            anchorOrigin={{
              horizontal: "center",
              vertical: "bottom",
            }}
            getContentAnchorEl={null}
            keepMounted
            onClose={handleClose}
            open={open}
            PaperProps={{
              sx: { width: 240 },
            }}
          >
            {EXCHANGES.map((e) => {
              return (
                <Box key={e.name}>
                  {e.symbols.map((s) => {
                    return (
                      <MenuItem
                        onClick={() => handleChangeMarket(e.name, s)}
                        key={`${e.name}-${s}`}
                        selected={e.name === exchange && s === symbol}
                      >
                        <Typography color="textPrimary" variant="subtitle2">
                          {`${e.name.toUpperCase()}-${s.toUpperCase()}`}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Box>
              );
            })}
          </Popover>
          <CryptoWatchChart
            exchange={exchange}
            symbol={symbol}
            colorScheme={settings.chartTheme}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CryptoWatchCard;
