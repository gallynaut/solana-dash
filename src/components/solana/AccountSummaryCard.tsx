import { useRef, useContext } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Divider, Grid, Typography, Button } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import AuthContext from '../../contexts/SolanaContext';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import shortenPublicKey from '../../utils/shortenPublicKey';
import SolanaGradientIcon from '../../icons/SolanaGradient';

const AccountSummaryCard: FC = () => {
  const theme = useTheme();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { isAuthenticated, account } = useContext(AuthContext);
  const pkStr: string = shortenPublicKey(account, 4, 8)


  return (
    <Card sx={{
      width: '100%',
      minHeight: '150px',
    }} >
      {isAuthenticated ?
        <>
          <Typography variant="subtitle1">
            Logged In:
        </Typography>
          <Typography variant="subtitle2">
            {pkStr}
          </Typography>
        </>

        :
        <>
          <Button>Click here to login</Button>
          <Typography variant="subtitle1">
            Not Authenticated
          </Typography>
        </>
      }
    </Card>
  );
};

export default AccountSummaryCard;
