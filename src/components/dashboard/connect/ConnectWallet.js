/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FC, useEffect, useMemo, useState } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { Connection, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import toHex from '../../../utils/hexToBuffer';
import shortenPublicKey from '../../../utils/shortenPublicKey';
import {
  Avatar,
  Button,
  Box,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Modal,
  ListItemAvatar,
  ListItemText,
  TextField,
  Paper,
  Typography
} from '@material-ui/core';
import { NETWORKS } from '../../../constants';
import {
  setNetwork,
  setAccount,
  setConnectedStatus,
  openModal,
  closeModal,
} from '../../../slices/solana';
import { useDispatch, useSelector } from '../../../store';
import { RootState } from '../../../store';
import NetworkPopover from './NetworkPopover'

function ConnectWallet() {
  const [logs, setLogs] = useState([]);
  const dispatch = useDispatch();
  // const [connectOpen, setConnectOpen] = useState(false);
  const {
    network,
    connectedStatus,
    account,
    isModalOpen
  } = useSelector((state) => state.solana);

  function addLog(log) {
    console.log(log)
    setLogs((logs) => [...logs, log]);
  }
  const handleOpen = () => {
    dispatch(openModal())
  };

  const handleClose = () => {
    dispatch(closeModal())
  };

  const handleNetworkChange = (network) => {
    // console.log(network.toLowerCase().replace("_", "-"))
    dispatch(setNetwork(network.toLowerCase().replace("_", "-")))
  };

  const connection = useMemo(() => new Connection(network.url), [network.url]);
  const solletWallet = useMemo(() => new Wallet('https://www.sollet.io', network.url), [
    'https://www.sollet.io',
    network.url,
  ]);

  const injectedWallet = useMemo(() => {
    try {
      return new Wallet(window.solana, network.url);
    } catch (e) {
      console.log(`Could not create injected wallet: ${e}`);
      return null;
    }
  }, [network.url]);
  const [selectedWallet, setSelectedWallet] = useState(undefined);

  useEffect(() => {
    if (selectedWallet) {
      selectedWallet.on('connect', () => {
        const pk = selectedWallet.publicKey.toBase58()
        console.log(pk)
        dispatch(setAccount(pk))
        addLog(`Connected to wallet ${pk}`);
      });
      selectedWallet.on('disconnect', () => {
        dispatch(setAccount(""))
        dispatch(setConnectedStatus(false))
        addLog('Disconnected from wallet');
      });
      selectedWallet.connect();
      return () => {
        selectedWallet.disconnect();
      };
    }
  }, [selectedWallet]);

  async function sendTransaction() {
    try {
      const transaction = SystemProgram.transfer({
        fromPubkey: selectedWallet.publicKey,
        toPubkey: selectedWallet.publicKey,
        lamports: 100,
      });
      addLog('Getting recent blockhash');
      transaction.recentBlockhash = (
        await connection.getRecentBlockhash()
      ).blockhash;
      addLog('Sending signature request to wallet');
      const signed = await selectedWallet.signTransaction(transaction);
      addLog('Got signature, submitting transaction');
      const signature = await connection.sendRawTransaction(signed.serialize());
      addLog(`Submitted transaction ${signature}, awaiting confirmation`);
      await connection.confirmTransaction(signature, 1);
      addLog(`Transaction ${signature} confirmed`);
    } catch (e) {
      console.warn(e);
      addLog(`Error: ${e.message}`);
    }
  }

  async function signMessage() {
    try {
      const message = 'Please sign this message for proof of address ownership.';
      addLog('Sending message signature request to wallet');
      const data = new TextEncoder().encode(message);
      const signed = await selectedWallet.sign(data, 'hex');
      addLog(`Got signature: ${toHex(signed.signature)}`);
    } catch (e) {
      console.warn(e);
      addLog(`Error: ${e.message}`);
    }
  }

  return (
    <>
      <Button
        color="primary"
        size="large"
        onClick={handleOpen}
        sx={{
          m: 3,
          pl: 3,
          pr: 3,
        }}
        variant="contained"
      >
        {!connectedStatus ? "Connect to Wallet" : shortenPublicKey(account.publicKey)}
      </Button>

      <Modal
        onClose={handleClose}
        open={isModalOpen}
        anchor='center'
        ModalProps={{ BackdropProps: { invisible: true } }}
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          p: 3
        }}
      >
        <Paper
          elevation={12}
          sx={{
            maxWidth: "40%",
            mx: 'auto',
            p: 2
          }}
        >
          <Grid container direction="column" item align="center">
            <Grid item>
              <Typography
                color="textPrimary"
                variant="h5"
                gutterbottom
              >
                Connect to Your Solana Wallet
            </Typography>
              <Divider />
              <NetworkPopover color="primary" />
              <Typography
                color="textPrimary"
                variant="body"
                sx={{
                  mt: 1,
                  mb: 1
                }}
              >
                {network.url}
              </Typography>
            </Grid>
            <Divider />
            <Grid item>
              <Button
                color="secondary"
                size="large"
                onClick={() => setSelectedWallet(solletWallet)}
                sx={{
                  m: 1,
                  pl: 8,
                  pr: 8,
                }}
                variant="contained"
              >
                Connect to Sollet.io
                  </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                size="large"
                onClick={() => setSelectedWallet(injectedWallet)}
                sx={{
                  m: 1,
                  pl: 8,
                  pr: 8,
                }}
                variant="contained"
              >
                Connect to Injected Wallet
                </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  );
}

export default ConnectWallet;

// const ConnectWalletButton: FC = () => (
//   <Box
//     sx={{
//       p: 3
//     }}
//   >
//     <div>
//       <Hidden lgDown>
//         <Button
//           color="primary" // should be different for light theme
//           size="large"
//           sx={{ mr: 3 }}
//           variant="contained"
//         >
//           Connect Wallet
//         </Button>
//       </Hidden>

//     </div>
//   </Box>
// );

// export default ConnectWalletButton;
