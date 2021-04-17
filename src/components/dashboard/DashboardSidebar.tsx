import { useEffect } from 'react';
import type { FC } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  Link,
  Typography
} from '@material-ui/core';
import ReceiptIcon from '@material-ui/icons/Receipt';
import useAuth from '../../hooks/useAuth';
import BriefcaseIcon from '../../icons/Briefcase';
import CalendarIcon from '../../icons/Calendar';
import ChartPieIcon from '../../icons/ChartPie';
import ChartSquareBarIcon from '../../icons/ChartSquareBar';
import FolderOpenIcon from '../../icons/FolderOpen';
import ShareIcon from '../../icons/Share';
import ShoppingBagIcon from '../../icons/ShoppingBag';
import ShoppingCartIcon from '../../icons/ShoppingCart';
import SolanaIcon from '../../icons/Solana';
import CashIcon from '../../icons/Cash';
import Logo from '../Logo';
import NavSection from '../NavSection';
import Scrollbar from '../Scrollbar';
import {
  setNetwork,
  setAccount,
  setConnectedStatus,
  openModal,
  closeModal,
} from '../../slices/solana';
import { useDispatch, useSelector } from '../../store';
import shortenPublicKey from '../../utils/shortenPublicKey'

interface DashboardSidebarProps {
  onMobileClose: () => void;
  openMobile: boolean;
}

const sections = [
  {
    title: 'Getting Started',
    items: [
      {
        title: 'Home',
        path: '/',
        icon: <ChartSquareBarIcon fontSize="small" />
      },
      {
        title: 'Beginners',
        path: '/beginners',
        icon: <ChartPieIcon fontSize="small" />,
        children: [
          {
            title: 'What is Solana',
            path: '/beginners/what'
          },
          {
            title: 'How does it Work',
            path: '/beginners/how'
          },
          {
            title: 'Creating a Wallet',
            path: '/beginners/create'
          },
          {
            title: 'Connecting a Wallet',
            path: '/beginners/connect'
          },
          {
            title: 'Receiving SOL',
            path: '/beginners/receive'
          },
          {
            title: 'Security',
            path: '/beginners/security'
          }
        ]
      },
      {
        title: 'Advanced',
        path: '/advanced',
        icon: <ShoppingBagIcon fontSize="small" />,
        children: [
          {
            title: 'Overview',
            path: '/advanced',
          },
          {
            title: 'What is Solana',
            path: '/advanced/what'
          },
        ]
      },
    ]
  },
  {
    title: 'Account',
    items: [
      {
        title: 'Account Overview',
        path: '/account',
        icon: <CashIcon fontSize="small" />
      },
      {
        title: 'Tokens',
        path: '/tokens',
        icon: <ShoppingCartIcon fontSize="small" />,
      },
      {
        title: 'Staking',
        path: '/staking',
        icon: <FolderOpenIcon fontSize="small" />,
      },
      {
        title: 'Farming',
        path: '/farming',
        icon: <ReceiptIcon fontSize="small" />
      }
    ]
  },
  {
    title: 'Network',
    items: [
      {
        title: 'Network Overview',
        path: '/network',
        icon: <BriefcaseIcon fontSize="small" />,
      },
      {
        title: 'Projects',
        path: '/projects',
        icon: <ShareIcon fontSize="small" />
      },
      {
        title: 'Calendar',
        path: '/calendar',
        icon: <CalendarIcon fontSize="small" />
      },
      {
        title: 'News',
        path: '/news',
        icon: <ShareIcon fontSize="small" />
      }
    ]
  }
];

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onMobileClose, openMobile } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    network,
    connectedStatus,
    account,
    isModalOpen
  } = useSelector((state) => state.solana);


  const openConnectWalletModal = () => {
    dispatch(openModal())
  }

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Scrollbar options={{ suppressScrollX: true }}>
        <Hidden lgUp>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 2
            }}
          >
            <RouterLink to="/">
              <SolanaIcon
                color="primary"
                sx={{
                  height: 40,
                  width: 40
                }}
              />
            </RouterLink>
          </Box>
        </Hidden>
        <Box sx={{ p: 2 }}>
          {/* START OF ACCOUNT INFO */}
          <Box
            sx={{
              alignItems: 'center',
              backgroundColor: 'background.default',
              borderRadius: 1,
              display: 'flex',
              overflow: 'hidden',
              p: 2
            }}
          >
            {/* <RouterLink to="/">
              <Avatar
                src={user.avatar}
                sx={{
                  cursor: 'pointer',
                  height: 48,
                  width: 48
                }}
              />
            </RouterLink> */}
            <Box sx={{ ml: 2 }}>
              <Typography
                color="textPrimary"
                variant="subtitle2"
              >
                Solana Dash
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Account:
                {' '}
                <Link
                  color="primary"
                  onClick={openConnectWalletModal}
                >
                  {!connectedStatus ? "Connect to Wallet" : shortenPublicKey(account.publicKey, 4, 8)}
                </Link>
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
              >
                Balance:
                {' '}
                <Typography
                  color="primary"
                  variant="body2"
                  display="inline"
                >
                  {!connectedStatus ? "Connect to Wallet" : 0.00000000}
                </Typography>
              </Typography>
            </Box>
          </Box>
          {/* END OF ACCOUNT BOX */}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {sections.map((section) => (
            <NavSection
              key={section.title}
              pathname={location.pathname}
              sx={{
                '& + &': {
                  mt: 3
                }
              }}
              {...section}
            />
          ))}
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography
            color="textPrimary"
            variant="subtitle2"
          >
            Need Help?
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Contact Us
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            fullWidth
            sx={{ mt: 2 }}
            to="/contact"
            variant="contained"
          >
            Contact Us
          </Button>
        </Box>
      </Scrollbar>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              width: 280
            }
          }}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          PaperProps={{
            sx: {
              backgroundColor: 'background.paper',
              height: 'calc(100% - 64px) !important',
              top: '64px !Important',
              width: 280
            }
          }}
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

export default DashboardSidebar;
