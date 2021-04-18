import { useRef, useContext } from 'react';
import type { FC } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, Divider, Grid, Typography, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import AuthContext from '../../contexts/SolanaContext';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import shortenPublicKey from '../../utils/shortenPublicKey';
import SolanaGradientIcon from '../../icons/SolanaGradient';

const AccountSummaryCard: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { isAuthenticated, publicKey } = useContext(AuthContext);
  const pkStr: string = shortenPublicKey(publicKey, 4, 8)

  const handleClick = (): void => {
    navigate('/account')
  }

  return (
    <Card sx={{
      width: '100%',
      minHeight: '150px',
    }} >
      <Grid container direction="column" alignItems="center">
        {isAuthenticated ?
          <>
            <Grid spacing={3} container direction="row" alignItems="center">
              <Grid item xs={4} sx={{ marginLeft: 3 }} >
                <Typography variant="subtitle2" >
                  Logged In:
          </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }} >
                <Button onClick={handleClick}>{pkStr}</Button>
              </Grid>
            </Grid>
            <Divider flexItem variant="middle" />
          </>

          :
          <>
            <Grid item><Button onClick={handleClick}>Click here to connect your wallet</Button></Grid>
            <Grid item><Divider flexItem variant="middle" /></Grid>
            <Grid item><SolanaGradientIcon sx={{ fontSize: '4em' }} /></Grid>
            <Grid item><Divider flexItem variant="middle" /></Grid>
            <Grid item><Button onClick={handleClick}>Click here to connect your wallet</Button></Grid>
          </>
        }
      </Grid>
    </Card>
  );
};

export default AccountSummaryCard;
