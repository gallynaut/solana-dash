import { useRef, useContext } from "react";
import type { FC } from "react";
import { IconButton } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import WifiIcon from "@material-ui/icons/Wifi";
import WifiOffIcon from "@material-ui/icons/WifiOff";
import ReplayIcon from "@material-ui/icons/Replay";
import AuthContext from "../../contexts/SolanaContext";
import LightNetworkSelect from "./LightNetworkSelect";

const NetworkNavbar: FC = () => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { connection, setConnection } = useContext(AuthContext);

  const handleNetworkRefresh = (): void => {
    if (connection == null) {
      setConnection();
    } else {
      console.log("connection already established");
    }
  };

  return (
    <>
      <LightNetworkSelect />
      {connection != null ? (
        <IconButton aria-label="connect solana network" component="span">
          <WifiIcon
            sx={{
              color: theme.palette.primary.main,
            }}
          />
        </IconButton>
      ) : (
        <IconButton aria-label="disconnect solana network" component="span">
          <WifiOffIcon
            sx={{
              color: theme.palette.error.main,
              ml: 2,
            }}
          />
        </IconButton>
      )}
      <IconButton
        aria-label="refresh connection"
        component="span"
        onClick={handleNetworkRefresh}
      >
        <ReplayIcon color="primary" />
      </IconButton>
    </>
  );
};

export default NetworkNavbar;
