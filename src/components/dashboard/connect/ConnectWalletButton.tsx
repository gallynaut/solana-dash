import type { FC } from 'react';
import { Box, Button } from '@material-ui/core';
// import {theme } from '../../../theme/index';

const ConnectWalletButton: FC = () => (
  <Box
    sx={{
      p: 3
    }}
  >
    <div>
      <Button
        color="primary" // should be different for light theme
        size="large"
        sx={{ mr: 3 }}
        variant="contained"
      >
        Connect Wallet
      </Button>
    </div>
  </Box>
);

export default ConnectWalletButton;
