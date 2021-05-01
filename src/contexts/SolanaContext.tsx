/* eslint-disable no-console */
import { createContext, useReducer, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import {
  Connection,
  Cluster,
  clusterApiUrl,
  Supply,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import type { RpcResponseAndContext } from "@solana/web3.js";
import SolanaWallet, { PublicKey } from "@project-serum/sol-wallet-adapter";
import { NETWORKS, WALLETS } from "../constants";
// import SolanaWallet from '@project-serum/sol-wallet-adapter'
import useInterval from "../hooks/useInterval";
import { notify } from "../utils/notifications";
import lamportsToSol from "../utils/lamportsToSol";

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  cluster: string;
  connection: Connection | null;
  account: PublicKey | null;
  publicKey: string;
  wallet: any;
  walletProvider: string;
  balance: RpcResponseAndContext<number>;
  supply: Supply | null;
}
// interface Balances {
//   devnet: RpcResponseAndContext<number> | null;
//   testnet: RpcResponseAndContext<number> | null;
//   mainnetBeta: RpcResponseAndContext<number> | null;
// }

interface AuthContextValue extends State {
  platform: "Solana";
  connectAccount: (networkURL: string, providerURL: string) => Promise<void>;
  disconnectAccount: () => Promise<void>;
  setCluster: (cluster: string) => Promise<void>;
  setConnection: () => Promise<void>;
  setWalletProvider: (providerURL: string) => Promise<void>;
  getBalance: () => Promise<void>;
  getSolanaSupply: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: "INITIALIZE";
};
type ConnectAccountAction = {
  type: "CONNECT_ACCOUNT";
  payload: {
    account: PublicKey | null;
    publicKey: string;
  };
};
type DisconnectAccountAction = {
  type: "DISCONNECT_ACCOUNT";
};
type SetClusterAction = {
  type: "SET_CLUSTER";
  payload: {
    cluster: string;
  };
};
type SetConnectionAction = {
  type: "SET_CONNECTION";
  payload: {
    connection: Connection | null;
  };
};
type SetWalletAction = {
  type: "SET_WALLET";
  payload: {
    wallet: any; // idk what type it is
  };
};
type SetWalletProviderAction = {
  type: "SET_WALLET_PROVIDER";
  payload: {
    walletProvider: string;
  };
};
type SetBalanceAction = {
  type: "SET_BALANCE";
  payload: {
    balance: RpcResponseAndContext<number> | null;
  };
};
type SetSolanaSupplyAction = {
  type: "SET_SOLANA_SUPPLY";
  payload: {
    supply: Supply | null;
  };
};

type Action =
  | InitializeAction
  | ConnectAccountAction
  | DisconnectAccountAction
  | SetClusterAction
  | SetConnectionAction
  | SetWalletAction
  | SetWalletProviderAction
  | SetBalanceAction
  | SetSolanaSupplyAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  cluster: "mainnetBeta",
  connection: new Connection("mainnetBeta"),
  account: null, // we could pull from local storage during initialize
  publicKey: "",
  wallet: null,
  walletProvider: "",
  balance: null,
  supply: null,
};

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    return {
      ...state,
      isInitialized: true,
    };
  },
  CONNECT_ACCOUNT: (state: State, action: ConnectAccountAction): State => {
    const { account, publicKey } = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      account,
      publicKey,
    };
  },
  DISCONNECT_ACCOUNT: (
    state: State,
    action: DisconnectAccountAction
  ): State => {
    return {
      ...state,
      isAuthenticated: false,
      account: null,
      publicKey: "",
      walletProvider: "",
    };
  },
  SET_CLUSTER: (state: State, action: SetClusterAction): State => {
    const { cluster } = action.payload;
    return {
      ...state,
      cluster,
    };
  },
  SET_CONNECTION: (state: State, action: SetConnectionAction): State => {
    const { connection } = action.payload;
    return {
      ...state,
      connection,
    };
  },
  SET_WALLET: (state: State, action: SetWalletAction): State => {
    const { wallet } = action.payload;
    return {
      ...state,
      wallet,
    };
  },
  SET_WALLET_PROVIDER: (
    state: State,
    action: SetWalletProviderAction
  ): State => {
    const { walletProvider } = action.payload;
    return {
      ...state,
      walletProvider,
    };
  },
  SET_BALANCE: (state: State, action: SetBalanceAction): State => {
    const { balance } = action.payload;
    console.log("setting balance ", balance);
    return {
      ...state,
      balance,
    };
  },
  SET_SOLANA_SUPPLY: (state: State, action: SetSolanaSupplyAction): State => {
    const { supply } = action.payload;
    console.log("setting solana supply ", supply);
    return {
      ...state,
      supply,
    };
  },
};

const reducer = (state: State, action: Action): State =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: "Solana",
  connectAccount: (networkURL: string, providerURL: string) =>
    Promise.resolve(),
  disconnectAccount: () => Promise.resolve(),
  setCluster: (cluster: string) => Promise.resolve(),
  setConnection: () => Promise.resolve(),
  setWalletProvider: (providerURL: string) => Promise.resolve(),
  getBalance: () => Promise.resolve(),
  getSolanaSupply: () => Promise.resolve(),
});

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      dispatch({ type: "INITIALIZE" });
    };
    initialize();
  }, []);

  // when network changes, update connection
  useEffect(() => {
    setConnection();
    if (state.isInitialized) {
      enqueueSnackbar("Solana cluster updated", {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        variant: "success",
      });
    }
  }, [state.cluster]);

  // update wallet when provider changes/disconnects
  useEffect(() => {
    if (state.walletProvider !== "") {
      console.log("changing wallet");
      connectAccount(NETWORKS[state.cluster].url, state.walletProvider);
    }
  }, [state.walletProvider]);

  useEffect(() => {
    if (state.account != null) {
      getBalance();
    }
  }, [state.account, state.connection]);

  useEffect(() => {
    if (state.isInitialized && state.connection != null) {
      getSolanaSupply();
    }
  }, [state.connection]);

  useEffect(() => {
    console.log("B1 hit");
    if (state.isInitialized && state.account == null) {
      enqueueSnackbar("Wallet disconnected", {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        variant: "error",
      });
    } else if (state.isInitialized && state.account != null) {
      enqueueSnackbar("Wallet connected", {
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
        variant: "success",
      });
    }
  }, [state.account]);

  useInterval(() => {
    console.log("getting balance");
    getBalance();
  }, 60000);

  useInterval(() => {
    console.log("getting network supply");
    getSolanaSupply();
  }, 30000);

  const getBalance = async (): Promise<void> => {
    if (state.connection != null && state.publicKey !== "") {
      const conn: Connection = state.connection;
      conn.getBalanceAndContext(state.account).then((resp) =>
        dispatch({
          type: "SET_BALANCE",
          payload: {
            balance: resp,
          },
        })
      );
    }
  };

  const getSolanaSupply = async (): Promise<void> => {
    if (state.connection != null) {
      const conn: Connection = state.connection;
      conn.getSupply().then((resp) => {
        dispatch({
          type: "SET_SOLANA_SUPPLY",
          payload: {
            supply: resp.value,
          },
        });
      });
    }
  };

  const connectAccount = async (
    networkURL: string,
    providerURL: string
  ): Promise<void> => {
    const wallet: any = new SolanaWallet(providerURL, networkURL);
    wallet.on("connect", () => {
      const pk: PublicKey = wallet.publicKey;
      console.log(`Connected to wallet ${wallet.publicKey.toBase58()}`);
      dispatch({
        type: "CONNECT_ACCOUNT",
        payload: {
          account: pk,
          publicKey: wallet.publicKey.toBase58(),
        },
      });
    });
    wallet.connect();
  };

  const disconnectAccount = async (): Promise<void> => {
    console.log("disconnecting account");
    dispatch({ type: "DISCONNECT_ACCOUNT" });
  };

  const setCluster = async (cluster: string): Promise<void> => {
    if (!(cluster in NETWORKS)) {
      console.log("no network exist for ", cluster);
      return;
    }
    const nw: any = state.cluster;

    console.log("setting network ", cluster);
    dispatch({
      type: "SET_CLUSTER",
      payload: {
        cluster,
      },
    });
  };
  const setConnection = async (): Promise<void> => {
    console.log("setting connection for ", state.cluster);
    try {
      const c: Cluster = NETWORKS[state.cluster].cluster;
      const newConn: Connection = new Connection(clusterApiUrl(c));
      dispatch({
        type: "SET_CONNECTION",
        payload: {
          connection: newConn,
        },
      });
    } catch (err) {
      console.log("error setting connection: ", err);
      dispatch({
        type: "SET_CONNECTION",
        payload: {
          connection: null,
        },
      });
    }
  };

  const setWalletProvider = async (providerURL: string): Promise<void> => {
    console.log("setting wallet provider to ", providerURL);
    dispatch({
      type: "SET_WALLET_PROVIDER",
      payload: {
        walletProvider: providerURL,
      },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: "Solana",
        connectAccount,
        disconnectAccount,
        setCluster,
        setConnection,
        setWalletProvider,
        getBalance,
        getSolanaSupply,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
