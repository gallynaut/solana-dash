import { useContext, useEffect } from 'react';
import type { FC } from 'react';
import {
  Button,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import useIsMountedRef from '../../hooks/useIsMountedRef';

import { NETWORKS, WALLETS } from '../../constants';
import { Wallet } from '../../types/wallet'
import AuthContext from '../../contexts/SolanaContext'

const LoginSolana: FC = (props) => {
  const isMountedRef = useIsMountedRef();
  const { cluster, connectAccount, setWalletProvider } = useContext(AuthContext)


  const handleClick = (wallet: Wallet) => {
    // console.log(wallet.url)
    // const networkURL: string = NETWORKS[cluster].url
    // connectAccount(networkURL, wallet.url)
    setWalletProvider(wallet.url)
  };

  return (
    <>
      <Grid
        container
        component='div'
        direction="column"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h2" noWrap>Choose a Wallet</Typography>
        </Grid>

        <Divider sx={{ my: 3 }} />
        {WALLETS.map((w: Wallet) => (
          <Grid item key={w.label}>
            <Button
              color="primary"
              size="large"
              onClick={() => handleClick(w)}
              sx={{
                m: 3,
                pl: 3,
                pr: 3,
                minWidth: '200px'
              }}
              variant="contained"
            >
              {w.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LoginSolana;
