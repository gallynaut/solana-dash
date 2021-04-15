import type { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar, Typography } from '@material-ui/core';
import { experimentalStyled } from '@material-ui/core/styles';
import type { AppBarProps } from '@material-ui/core';
import MenuIcon from '../../icons/Menu';
import SolanaIcon from '../../icons/Solana';
import AccountPopover from './AccountPopover';
import ContentSearch from './ContentSearch';
import NetworkPopover from './connect/NetworkPopover';
import NotificationsPopover from './NotificationsPopover';
import ConnectWallet from './connect/ConnectWallet';

interface DashboardNavbarProps extends AppBarProps {
  onSidebarMobileOpen?: () => void;
}

const DashboardNavbarRoot = experimentalStyled(AppBar)(
  ({ theme }) => (
    {
      ...(
        theme.palette.mode === 'light' && {
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none',
          color: theme.palette.primary.contrastText
        }
      ),
      ...(
        theme.palette.mode === 'dark' && {
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: 'none'
        }
      ),
      zIndex: theme.zIndex.drawer + 100
    }
  )
);

const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onSidebarMobileOpen, ...other } = props;

  return (
    <DashboardNavbarRoot {...other}>
      <Toolbar sx={{ 
        // minHeight: 64,
        maxHeight: 64
      }}
      >
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarMobileOpen}
          >
            <SolanaIcon
              color="primary"
              fontSize="small"
            />
          </IconButton>
        </Hidden>
        <Hidden lgDown>
          <RouterLink to="/">
            <SolanaIcon
              color="primary"
              sx={{
                height: 40,
                width: 40
              }}
            />
          </RouterLink>
          <Typography 
            variant="h3"
            color="secondary"
            sx={{
              height: 40,
            }}
          >
            DASH
          </Typography>
        </Hidden>
        <Box
          sx={{
            flexGrow: 1,
            ml: 2
          }}
        />
        <NetworkPopover />
        <ConnectWallet />
        
        <Box sx={{ ml: 1 }}>
          <ContentSearch />
        </Box>
        <Box sx={{ ml: 1 }}>
          <NotificationsPopover />
        </Box>
        <Box sx={{ ml: 2 }}>
          <AccountPopover />
        </Box>
      </Toolbar>
    </DashboardNavbarRoot>
  );
};

DashboardNavbar.propTypes = {
  onSidebarMobileOpen: PropTypes.func
};

export default DashboardNavbar;
