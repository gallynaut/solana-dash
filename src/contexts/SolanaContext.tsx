import { createContext, useReducer, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { NETWORKS, WALLETS } from '../constants'
import { Connection, Cluster, clusterApiUrl } from '@solana/web3.js';

interface State {
  isInitialized: boolean;
  isAuthenticated: boolean;
  cluster: string;
  connection: Connection | null;
}

interface AuthContextValue extends State {
  platform: 'Solana';
  connectAccount: () => Promise<void>;
  disconnectAccount: () => Promise<void>;
  setCluster: (cluster: string) => Promise<void>;
  setConnection: (cluster: string) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitializeAction = {
  type: 'INITIALIZE';
};
type ConnectAccountAction = {
  type: 'CONNECT_ACCOUNT';
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

type Action = InitializeAction
  | ConnectAccountAction
  | DisconnectAccountAction
  | SetClusterAction
  | SetConnectionAction;

const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  cluster: 'devnet',
  connection: new Connection('devnet')
}

const handlers: Record<string, (state: State, action: Action) => State> = {
  INITIALIZE: (state: State, action: InitializeAction): State => {
    return {
      ...state,
      isInitialized: true,
    };
  },
  CONNECT_ACCOUNT: (state: State, action: ConnectAccountAction): State => {
    return {
      ...state,
      isAuthenticated: true
    };
  },
  DISCONNECT_ACCOUNT: (state: State, action: DisconnectAccountAction): State => {
    return {
      ...state,
      isAuthenticated: false
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
};

const reducer = (state: State, action: Action): State => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  platform: 'Solana',
  connectAccount: () => Promise.resolve(),
  disconnectAccount: () => Promise.resolve(),
  setCluster: (cluster: string) => Promise.resolve(),
  setConnection: (cluster: string) => Promise.resolve(),
})

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // effect
    // return () => {
    //     cleanup
    // }
    const initialize = async (): Promise<void> => {
      dispatch({ type: 'INITIALIZE', })
    };


    initialize();
  }, [])

  const connectAccount = async (): Promise<void> => {
    console.log("connecting to account")
    dispatch({ type: 'CONNECT_ACCOUNT' })
  }

  const disconnectAccount = async (): Promise<void> => {
    console.log("disconnecting to account")
    dispatch({ type: 'DISCONNECT_ACCOUNT' })
  }

  const setCluster = async (cluster: string): Promise<void> => {
    if (!(cluster in NETWORKS)) {
      console.log("no network exist for ", cluster)
      return
    }

    console.log("setting network ", cluster)
    dispatch({
      type: 'SET_CLUSTER',
      payload: {
        cluster: cluster,
      }
    })
    // need to also set connection everytime
    try {
      const c: Cluster = NETWORKS[cluster].cluster
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
  const setConnection = async (cluster: string): Promise<void> => {
    if (!(cluster in NETWORKS)) {
      console.log("no network exist for ", cluster)
      return
    }
    try {
      const c: Cluster = NETWORKS[cluster].cluster
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        platform: 'Solana',
        connectAccount,
        disconnectAccount,
        setCluster,
        setConnection,
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