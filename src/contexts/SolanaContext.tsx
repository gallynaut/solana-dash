/* eslint-disable no-console */
import { createContext, useReducer, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { Connection, Cluster, clusterApiUrl, PublicKey } from "@solana/web3.js";
import type { RpcResponseAndContext } from "@solana/web3.js";
import SolanaWallet from "@project-serum/sol-wallet-adapter";
import {
  Infer,
  number,
  optional,
  enums,
  boolean,
  string,
  type,
  coerce,
  create,
  instance,
} from "superstruct";
import { NETWORKS, TOKEN_PROGRAM_ID } from "../constants";
import useInterval from "../hooks/useInterval";

export const PublicKeyFromString = coerce(
  instance(PublicKey),
  string(),
  (value) => new PublicKey(value)
);

export const TokenAccountType = enums(["mint", "account", "multisig"]);

export type TokenAccountState = Infer<typeof AccountState>;
const AccountState = enums(["initialized", "uninitialized", "frozen"]);

const TokenAmount = type({
  decimals: number(),
  uiAmountString: string(),
  amount: string(),
});
export type TokenAccountInfo = Infer<typeof TokenAccountInfo>;
export const TokenAccountInfo = type({
  mint: PublicKeyFromString,
  owner: PublicKeyFromString,
  tokenAmount: TokenAmount,
  delegate: optional(PublicKeyFromString),
  state: AccountState,
  isNative: boolean(),
  rentExemptReserve: optional(TokenAmount),
  delegatedAmount: optional(TokenAmount),
  closeAuthority: optional(PublicKeyFromString),
});

declare global {
  interface Window {
    solana: any;
  }
}
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
  getTokenBalances: () => Promise<void>;
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

type Action =
  | InitializeAction
  | ConnectAccountAction
  | DisconnectAccountAction
  | SetClusterAction
  | SetConnectionAction
  | SetWalletAction
  | SetWalletProviderAction
  | SetBalanceAction;

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
  getTokenBalances: () => Promise.resolve(),
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
          horizontal: "center",
          vertical: "bottom",
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
      getTokenBalances();
    }
  }, [state.account, state.connection]);

  useEffect(() => {
    if (state.isInitialized && state.account == null) {
      enqueueSnackbar("Wallet disconnected", {
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
        variant: "error",
      });
    } else if (state.isInitialized && state.account != null) {
      enqueueSnackbar("Wallet connected", {
        anchorOrigin: {
          horizontal: "center",
          vertical: "bottom",
        },
        variant: "success",
      });
    }
  }, [state.account]);

  // every 5 minutes
  useInterval(() => {
    console.log("getting balance");
    getBalance();
    console.log("getting token balances");
    getTokenBalances();
  }, 300000);

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

  const getTokenBalances = async (): Promise<void> => {
    if (state.connection != null && state.account != null) {
      const conn: Connection = state.connection;
      conn
        .getParsedTokenAccountsByOwner(state.account, {
          programId: TOKEN_PROGRAM_ID,
        })
        .then((resp) => {
          const data: any = {
            tokens: resp.value.map((accountInfo) => {
              const parsedInfo = accountInfo.account.data.parsed.info;
              const info = create(parsedInfo, TokenAccountInfo);
              return info;
            }),
          };
          const t: TokenAccountInfo[] = data.tokens;
          t.sort((a, b) =>
            b.tokenAmount.uiAmountString.localeCompare(
              a.tokenAmount.uiAmountString
            )
          );
          console.log("TOKENS: ", t);
        });
    }
  };

  const connectAccount = async (
    networkURL: string,
    providerURL: string
  ): Promise<void> => {
    const getPhantomProvider = () => {
      if ("solana" in window) {
        const provider = window.solana;
        if (provider.isPhantom) {
          return provider;
        }
      }
      window.open("https://phantom.app/", "_blank");
    };
    let wallet: any = new SolanaWallet(providerURL, networkURL);
    if (providerURL === "https://www.phantom.app") {
      wallet = getPhantomProvider();
      setCluster("mainnetBeta"); // phantom only has mainnet
    }
    wallet.on("connect", () => {
      const pk: PublicKey = wallet.publicKey;
      console.log(`Connected to wallet ${wallet.publicKey.toBase58()}`);
      dispatch({
        type: "CONNECT_ACCOUNT",
        payload: {
          account: pk,
          publicKey: pk.toBase58(),
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
        getTokenBalances,
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
