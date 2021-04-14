import type { FC } from 'react';
import {
  formatDistanceToNowStrict,
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
import { truncate } from 'lodash';
import StatusIndicator from '../../StatusIndicator';

const now = new Date();

const contacts = [
  {
    id: 'phantom',
    avatar: '/static/mock-images/avatars/avatar-alcides_antonio.png',
    isActive: true,
    lastActivity: now.getTime(),
    name: 'Phantom',
  },
  {
    id: 'sollet',
    avatar: '/static/mock-images/avatars/avatar-marcus_finn.png',
    isActive: truncate,
    lastActivity: subHours(now, 2).getTime(),
    name: 'Sollet',
  },
  {
    id: '5e887ac47eed253091be10cb',
    avatar: '/static/mock-images/avatars/avatar-carson_darrin.png',
    isActive: false,
    lastActivity: subMinutes(now, 15).getTime(),
    name: 'Carson Darrin',
    username: 'carson.darrin'
  },
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
        Contacts
      </Typography>
      <Box sx={{ mt: 2 }}>
        <List disablePadding>
          {contacts.map((contact) => (
            <ListItem
              disableGutters
              key={contact.id}
            >
              <ListItemAvatar>
                <Avatar src={contact.avatar} />
              </ListItemAvatar>
              <ListItemText
                disableTypography
                primary={(
                  <Link
                    color="textPrimary"
                    display="block"
                    noWrap
                    underline="none"
                    variant="subtitle2"
                  >
                    {contact.name}
                  </Link>
                )}
              />
              {
                contact.isActive
                  ? (
                    <StatusIndicator
                      size="small"
                      status="online"
                    />
                  )
                  : (
                    <Typography
                      color="textSecondary"
                      noWrap
                      variant="caption"
                    >
                      {formatDistanceToNowStrict(contact.lastActivity)}
                      {' '}
                      ago
                    </Typography>
                  )
              }
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  </Box>
);

export default ConnectWalletModal;
