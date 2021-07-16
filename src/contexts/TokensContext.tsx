import { createContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import {
  TokenListProvider,
  TokenInfo,
  ENV as SolanaENV,
} from "@solana/spl-token-registry";

interface Tokens {
  lastUpdated: Number;
  // tokens: Map<string, TokenInfo>;
  mainnetBeta: TokenInfo[];
  devnet: TokenInfo[];
  testnet: TokenInfo[];
}

export interface TokensContextValue {
  tokens: Tokens;
  fetchTokens: () => Promise<void>;
}

interface TokensProviderProps {
  children?: ReactNode;
}

const initialTokens: Tokens = {
  lastUpdated: 0,
  mainnetBeta: [],
  devnet: [],
  testnet: [],
};

export const restoreTokens = (): Tokens | null => {
  let tokens: Tokens | null = null;

  try {
    const storedData: string | null = window.localStorage.getItem("tokens");

    if (storedData) {
      const storedObj: Tokens = JSON.parse(storedData);
      // console.log(storedObj);
      // const mainnetTokenMap = arrayToTokenMap(storedObj.mainnetBeta);
      // const devnetTokenMap = arrayToTokenMap(storedObj.devnet);
      // const testnetTokenMap = arrayToTokenMap(storedObj.testnet);
      // const lastUpd = storedObj.lastUpdated;
      tokens = storedObj;
    } else {
      tokens = initialTokens;
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }

  return tokens;
};

export const storeTokens = (tokens: Tokens): void => {
  console.log("Saving tokens");
  window.localStorage.setItem("tokens", JSON.stringify(tokens));
};

const TokensContext = createContext<TokensContextValue>({
  tokens: initialTokens,
  fetchTokens: () => Promise.resolve(),
});

export const TokensProvider: FC<TokensProviderProps> = (props) => {
  const { children } = props;
  const [tokens, setTokens] = useState<Tokens>(initialTokens);

  useEffect(() => {
    const restoredTokens = restoreTokens();
    console.log(Object.keys(restoredTokens.mainnetBeta).length);
    if (restoredTokens === null) {
      fetchTokens();
    } else if (
      Object.keys(restoredTokens.mainnetBeta).length === 0 ||
      Object.keys(restoredTokens.devnet).length === 0 ||
      Object.keys(restoredTokens.testnet).length === 0
    ) {
      fetchTokens();
    } else {
      saveTokens(restoredTokens);
    }
  }, []);

  const fetchTokens = async (): Promise<void> => {
    console.log("fetching");
    new TokenListProvider().resolve().then((tokens) => {
      const t: Tokens = {
        lastUpdated: Date.now(),
        mainnetBeta: tokens.filterByChainId(SolanaENV.MainnetBeta).getList(),
        devnet: tokens.filterByChainId(SolanaENV.Devnet).getList(),
        testnet: tokens.filterByChainId(SolanaENV.Testnet).getList(),
      };
      saveTokens(t);
    });
  };

  const saveTokens = (updatedTokens: Tokens): void => {
    setTokens(updatedTokens);
    storeTokens(updatedTokens);
  };

  return (
    <TokensContext.Provider
      value={{
        tokens,
        fetchTokens,
      }}
    >
      {children}
    </TokensContext.Provider>
  );
};

TokensProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const mapTokenList = (tokenList: TokenInfo[]): Map<string, TokenInfo> => {
  const tokenMap = tokenList.reduce((map, item) => {
    map.set(item.address, item);
    return map;
  }, new Map());
  return tokenMap;
};

const tokenMapToArray = (tokenMap: Map<string, TokenInfo>): Array<any> => {
  return Array.from(tokenMap.entries());
};
const arrayToTokenMap = (tokenArray: Array<any>): Map<string, TokenInfo> => {
  const tokenMap = new Map<string, TokenInfo>();
  tokenArray.forEach((t) => {
    const [key, token] = t;
    tokenMap[key] = token;
  });
  console.log(tokenMap);
  return tokenMap;
};

export const TokensConsumer = TokensContext.Consumer;

export default TokensContext;
