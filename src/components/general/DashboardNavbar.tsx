import type { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Grid,
} from "@material-ui/core";
import { experimentalStyled } from "@material-ui/core/styles";
import type { AppBarProps } from "@material-ui/core";
import MenuIcon from "../../icons/Menu";
import SolanaIcon from "../../icons/Solana";
import AccountPopover from "./AccountPopover";
import ContentSearch from "./ContentSearch";
import NetworkPopover from "../network/NetworkPopover";
import NotificationsPopover from "./NotificationsPopover";
import NetworkNavbar from "../network/NetworkNavbar";
import ConnectAccountButton from "../account/ConnectAccountButton";
import LightNetworkSelect from "../network/LightNetworkSelect";

interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(({ theme }) => ({
  ...(theme.palette.mode === "light" && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
    color: theme.palette.primary.contrastText,
  }),
  ...(theme.palette.mode === "dark" && {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: "none",
  }),
  zIndex: theme.zIndex.drawer + 100,
}));

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar
        sx={{
          minHeight: 72,
          maxHeight: 72,
        }}
      >
        <Hidden lgUp>
          <Grid
            container
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            <Grid item>
              <IconButton color="inherit" onClick={onSidebarMobileOpen}>
                <SolanaIcon color="primary" fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <Typography
                variant="h3"
                color="secondary"
                sx={{
                  height: 40,
                  display: "inline",
                }}
              >
                DASH
              </Typography>
            </Grid>
          </Grid>
        </Hidden>
        <Hidden lgDown>
          <RouterLink to="/">
            <Grid container>
              <Grid item>
                <SolanaIcon
                  color="primary"
                  sx={{
                    height: 40,
                    width: 40,
                    display: "inline",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography
                  variant="h3"
                  color="secondary"
                  sx={{
                    height: 40,
                    display: "inline",
                  }}
                >
                  DASH
                </Typography>
              </Grid>
            </Grid>
          </RouterLink>
        </Hidden>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2,
          }}
        />
        <Box sx={{ ml: 1 }}>
          <ContentSearch />
        </Box>
        <Hidden lgDown>
          <Divider orientation="vertical" flexItem variant="middle" />
          <Box sx={{ ml: 1 }}>
            <LightNetworkSelect />
          </Box>
          <Divider orientation="vertical" flexItem variant="middle" />{" "}
          <Box sx={{ ml: 1 }}>
            <ConnectAccountButton />
          </Box>
        </Hidden>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func,
};

export default DashboardNavbar;
