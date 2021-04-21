import { useRef, useContext } from 'react';
import type { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Divider, Grid, Typography, Button, IconButton, CardContent } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import AuthContext from '../../contexts/SolanaContext';
import { NETWORKS } from '../../constants'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import shortenPublicKey from '../../utils/shortenPublicKey';
import SolanaGradientIcon from '../../icons/SolanaGradient';

const AccountSummaryCard: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { isAuthenticated, publicKey, cluster, balance } = useContext(AuthContext);
  const pkStr: string = shortenPublicKey(publicKey, 8, 16)

  const handleClick = (): void => {
    navigate('/account')
  }

  return (
    <Card sx={{
      width: '100%',
      minHeight: '50px',
    }} >

      {/* <Grid container direction="column" alignItems="center"> */}
      {isAuthenticated ?
        <CardContent sx={{ ml: 0, mr: 0 }}>
          <Grid container direction="column" alignItems="center">
            <Grid item><Button onClick={handleClick}>{pkStr}</Button></Grid>
            <Grid item><Divider flexItem variant="middle" /></Grid>
            <Grid item>
              <Grid container justifyItems="flex-end">
                <Grid item  ><Typography variant="subtitle2" gutterBottom>NETWORK</Typography></Grid>
                <Grid item ><Typography variant="subtitle2" gutterBottom>{NETWORKS[cluster].label}</Typography></Grid>
              </Grid>
            </Grid>

            <Grid item sx={{ mt: 2, mb: 2 }}><Typography>BALANCE: {balance == null ? '' : balance.value}</Typography></Grid>
            <Grid item><Divider flexItem variant="middle" /></Grid>
            <Grid item><Grid spacing={3} container direction="row" alignItems="center">
              <Grid item xs={3} >
                <Typography variant="subtitle2" >
                  Network:
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }} >
                <Typography variant="subtitle1" >
                  {NETWORKS[cluster].label}
                </Typography>
              </Grid>
            </Grid></Grid>
          </Grid>
        </CardContent>


        :
        <CardContent>
          <Grid container direction="column" alignItems="center">
            <Grid item><Button onClick={handleClick}>Click here to connect your wallet</Button></Grid>
            <Grid item><Divider flexItem variant="middle" /></Grid>
            <Grid item><IconButton onClick={handleClick} ><SolanaGradientIcon sx={{ fontSize: '4em' }} /></IconButton></Grid>
            <Grid item><Divider flexItem variant="middle" /></Grid>
            <Grid item><Button onClick={handleClick}>Click here to connect your wallet</Button></Grid>
          </Grid>
        </CardContent>
      }

    </Card >
  );
};

export default AccountSummaryCard;
