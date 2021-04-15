import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk } from '../store';
import type { Account } from '@solana/web3.js';
import type { Network } from '../types/network';
import { Cluster, clusterApiUrl } from '@solana/web3.js';
import { NETWORKS } from '../constants'

interface SolanaAccount {
  publicKey: string;
}

interface SolanaState {
  network: Network;
  connectedStatus: boolean;
  account: SolanaAccount;
  isModalOpen: boolean;
}
// const initialNetwork: Network = {
//   name: "devnet",
//   url: clusterApiUrl("devnet"),
// }

const initialState: SolanaState = {
  network: NETWORKS['devnet'],
  connectedStatus: false,
  account: {
    publicKey: "",
  },
  isModalOpen: false,

};
//  reducer is used to update the state
const slice = createSlice({
  name: 'solana',
  initialState,
  reducers: {
    setNetwork(
      state: SolanaState,
      action: PayloadAction<{ network: Network }>
    ): void {
      const { network } = action.payload;

      state.network = network;
    },
    setAccount(
      state: SolanaState,
      action: PayloadAction<{ publicKey: string }>
    ): void {
      const { publicKey } = action.payload;

      state.account.publicKey = publicKey;
      state.isModalOpen = false;
      state.connectedStatus = publicKey != "" ? true : false;
    },
    setConnectedStatus(
      state: SolanaState,
      action: PayloadAction<{ connectedStatus: boolean }>
    ): void {
      const { connectedStatus } = action.payload;

      state.connectedStatus = connectedStatus;
    },
    openModal(state: SolanaState): void {
      state.isModalOpen = true;
    },
    closeModal(state: SolanaState): void {
      state.isModalOpen = false;
    }
  }
});

export const { reducer } = slice;

// actions are called by components and then sent to reducers

export const setNetwork = (network: Network): AppThunk => async (dispatch): Promise<void> => {
  console.log("dispatching...", network)
  dispatch(slice.actions.setNetwork({ network }));
};

export const setAccount = (publicKey: string): AppThunk => async (dispatch): Promise<void> => {
  dispatch(slice.actions.setAccount({ publicKey }))
};

export const setConnectedStatus = (connectedStatus: boolean): AppThunk => (dispatch): void => {
  dispatch(slice.actions.setConnectedStatus({ connectedStatus }));
};

export const openModal = (): AppThunk => (dispatch): void => {
  dispatch(slice.actions.openModal());
};

export const closeModal = (): AppThunk => (dispatch): void => {
  dispatch(slice.actions.closeModal());
};

export default slice;