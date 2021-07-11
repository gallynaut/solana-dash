import { useRef, useContext } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Grid, IconButton, Tooltip } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ClearIcon from "@material-ui/icons/Clear";
import AuthContext from "../../contexts/SolanaContext";
import NotificationsPopover from "../general/NotificationsPopover";

const ConnectWalletButton: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { isAuthenticated, disconnectAccount } = useContext(AuthContext);

  const handleClick = (): void => {
    navigate("/account");
  };
  const handleDisconnect = (): void => {
    disconnectAccount();
  };

  return (
    <Grid
      container
      alignItems="center"
      component="span"
      sx={{ minWidth: "175px" }}
    >
      {!isAuthenticated ? (
        <Grid item>
          <Button
            onClick={handleClick}
            ref={anchorRef}
            color="primary"
            size="large"
            sx={{
              m: 1,
              pl: 3,
              pr: 3,
              minWidth: "175px",
            }}
            variant="contained"
          >
            <VpnKeyIcon />
            <Divider
              orientation="vertical"
              flexItem
              variant="middle"
              sx={{ color: theme.palette.background.paper }}
            />
            Connect wallet
          </Button>
        </Grid>
      ) : (
        <>
          <Grid item>
            <Tooltip
              title="disconnect wallet"
              aria-label="disconnect wallet"
              arrow
            >
              <Button
                onClick={handleDisconnect}
                ref={anchorRef}
                color="primary"
                size="medium"
                sx={{
                  m: 1,
                  pl: 3,
                  pr: 3,
                  minWidth: "150px",
                }}
                variant="contained"
              >
                <ClearIcon fontSize="small" />
                <Divider
                  orientation="vertical"
                  flexItem
                  variant="middle"
                  sx={{ color: theme.palette.background.paper }}
                />
                Disconnect
              </Button>
              {/* <IconButton
                aria-label="logout"
                component="span"
                onClick={handleDisconnect}
                sx={{ flex: 1 }}
              >
                <ExitToAppIcon
                  color="primary"
                  fontSize="large"
                  sx={{ alignItems: "right" }}
                />
              </IconButton> */}
            </Tooltip>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ConnectWalletButton;
