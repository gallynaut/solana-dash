import { createContext, useReducer, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { NETWORKS, WALLETS } from '../constants'
import { Connection, Cluster, clusterApiUrl } from '@solana/web3.js';
import SolanaWallet, { PublicKey } from '@project-serum/sol-wallet-adapter';
// import SolanaWallet from '@project-serum/sol-wallet-adapter'

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  cluster: string;
  connection: Connection | null;
  account: PublicKey | null;
  wallet: any;
  walletProvider: string;
}

interface AuthContextValue extends State {
  platform: 'Solana';
  connectAccount: (networkURL: string, providerURL: string) => Promise<void>;
  disconnectAccount: () => Promise<void>;
  setCluster: (cluster: string) => Promise<void>;
  setConnection: () => Promise<void>;
  setWalletProvider: (providerURL: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
};
type ConnectAccountAction = {
  type: 'CONNECT_ACCOUNT';
  payload: {
    account: PublicKey | null;
  };
}
type DisconnectAccountAction = {
  type: 'DISCONNECT_ACCOUNT';
}
type SetClusterAction = {
  type: 'SET_CLUSTER';
  payload: {
    cluster: string;
  };
}
type SetConnectionAction = {
  type: 'SET_CONNECTION';
  payload: {
    connection: Connection | null;
  };
}
type SetWalletAction = {
  type: 'SET_WALLET';
  payload: {
    wallet: any; // idk what type it is
  }
}
type SetWalletProviderAction = {
  type: 'SET_WALLET_PROVIDER';
  payload: {
    walletProvider: string;
  };
}

type Action = InitializeAction
  | ConnectAccountAction
  | DisconnectAccountAction
  | SetClusterAction
  | SetConnectionAction
  | SetWalletAction
  | SetWalletProviderAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  cluster: 'devnet',
  connection: new Connection('devnet'),
  account: null, // we could pull from local storage during initialize
  wallet: null,
  walletProvider: '',
}

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    return {
      ...state,
      isInitialized: true,
    };
  },
  CONNECT_ACCOUNT: (state: State, action: ConnectAccountAction): State => {
    const { account } = action.payload
    return {
      ...state,
      isAuthenticated: true,
      account: account
    };
  },
  DISCONNECT_ACCOUNT: (state: State, action: DisconnectAccountAction): State => {
    return {
      ...state,
      isAuthenticated: false,
      account: null,
    };
  },
  SET_CLUSTER: (state: State, action: SetClusterAction): State => {
    const { cluster } = action.payload
    return {
      ...state,
      cluster: cluster,
    };
  },
  SET_CONNECTION: (state: State, action: SetConnectionAction): State => {
    const { connection } = action.payload
    return {
      ...state,
      connection: connection,
    };
  },
  SET_WALLET: (state: State, action: SetWalletAction): State => {
    const { wallet } = action.payload
    return {
      ...state,
      wallet: wallet,
    };
  },
  SET_WALLET_PROVIDER: (state: State, action: SetWalletProviderAction): State => {
    const { walletProvider } = action.payload
    return {
      ...state,
      walletProvider: walletProvider,
    };
  },
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'Solana',
  connectAccount: (networkURL: string, providerURL: string) => Promise.resolve(),
  disconnectAccount: () => Promise.resolve(),
  setCluster: (cluster: string) => Promise.resolve(),
  setConnection: () => Promise.resolve(),
  setWalletProvider: (providerURL: string) => Promise.resolve(),
})

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async (): Promise<void> => {
      dispatch({ type: 'INITIALIZE', })
    };
    initialize();
  }, [])

  // when network changes, update connection
  useEffect(() => {
    setConnection()
  }, [state.cluster])

  useEffect(() => {
    if (state.walletProvider != '') {
      console.log("changing wallet")
      connectAccount(NETWORKS[state.cluster].url, state.walletProvider)
    }

  }, [state.walletProvider])



  const connectAccount = async (networkURL: string, providerURL: string): Promise<void> => {
    const wallet: any = new SolanaWallet(providerURL, networkURL)
    wallet.on('connect', () => {
      const pk: PublicKey = wallet.publicKey
      console.log('Connected to wallet ' + wallet.publicKey.toBase58());
      dispatch({
        type: 'CONNECT_ACCOUNT',
        payload: pk,
      })
    });
    wallet.connect();

  }

  const disconnectAccount = async (): Promise<void> => {
    console.log("disconnecting account")
    dispatch({ type: 'DISCONNECT_ACCOUNT' })
  }

  const setCluster = async (cluster: string): Promise<void> => {
    if (!(cluster in NETWORKS)) {
      console.log("no network exist for ", cluster)
      return
    }
    const nw: any = state.cluster

    console.log("setting network ", cluster)
    dispatch({
      type: 'SET_CLUSTER',
      payload: {
        cluster: cluster,
      }
    })
  }
  const setConnection = async (): Promise<void> => {
    console.log("setting connection for ", state.cluster)
    try {
      const c: Cluster = NETWORKS[state.cluster].cluster
      const newConn: Connection = new Connection(clusterApiUrl(c))
      dispatch({
        type: 'SET_CONNECTION',
        payload: {
          connection: newConn,
        }
      })
    } catch (err) {
      console.log("error setting connection: ", err)
      dispatch({
        type: 'SET_CONNECTION',
        payload: {
          connection: null,
        }
      })
    }
  }

  const setWalletProvider = async (providerURL: string): Promise<void> => {
    console.log("setting wallet provider to ", providerURL)
    dispatch({
      type: 'SET_WALLET_PROVIDER',
      payload: {
        walletProvider: providerURL,
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Solana',
        connectAccount,
        disconnectAccount,
        setCluster,
        setConnection,
        setWalletProvider,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;