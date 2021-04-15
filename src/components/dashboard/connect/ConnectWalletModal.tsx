import type { FC } from 'react';
import {
  formatDistanceToNowStrict,
  subDays,
  subHours,
  subMinutes
} from 'date-fns';
import {
  Avatar,
  Box,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from '@material-ui/core';
import StatusIndicator from '../../StatusIndicator';

const now = new Date();

const contacts = [
  {
    id: '5e8891ab188cd2855e6029b7',
    avatar: '/static/mock-images/avatars/avatar-alcides_antonio.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Alcides Antonio',
    username: 'alcides.antonio'
  },
  {
    id: '5e887a62195cc5aef7e8ca5d',
    avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
    isActive: false,
    lastActivity: subHours(now, 2).getTime(),
    name: 'Marcus Finn',
    username: 'marcus.finn'
  },
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    isActive: false,
    lastActivity: subMinutes(now, 15).getTime(),
    name: 'Carson Darrin',
    username: 'carson.darrin'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    avatar: '/static/mock-images/avatars/avatar-fran_perez.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Fran Perez',
    username: 'fran.perez'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Jie Yan Song',
    username: 'jie.yan.song'
  }
];

const ConnectWalletModal: FC = () => (
  <Box
    sx={{
      backgroundColor: 'background.default',
      minHeight: '100%',
      p: 3
    }}
  >
    <Paper
      elevation={12}
      sx={{
        maxWidth: 320,
        mx: 'auto',
        p: 2
      }}
    >
      <Typography
        color="textPrimary"
        variant="h6"
      >
        Connect to Your Solana Wallet
      </Typography>
      <Box sx={{ mt: 2 }}>
        <List disablePadding>
          <ListItem>#1</ListItem>
          <ListItem>#2</ListItem>
          <ListItem>#3</ListItem>
        </List>
      </Box>
    </Paper>
  </Box>
);

export default ConnectWalletModal;
