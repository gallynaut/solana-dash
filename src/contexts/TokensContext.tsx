import { createContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import {
  TokenListProvider,
  TokenInfo,
  ENV as SolanaENV,
} from "@solana/spl-token-registry";
import { getSite } from "../types/TokenData";
import useInterval from "../hooks/useInterval";

interface Tokens {
  lastUpdated: Number;
  // tokens: Map<string, TokenInfo>;
  mainnetBeta: Map<string, TokenInfo>;
  devnet: Map<string, TokenInfo>;
  testnet: Map<string, TokenInfo>;
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
  mainnetBeta: new Map<string, TokenInfo>(),
  devnet: new Map<string, TokenInfo>(),
  testnet: new Map<string, TokenInfo>(),
};

export const restoreTokens = (): Tokens | null => {
  let tokens: Tokens | null = null;

  try {
    const storedData: string | null = window.localStorage.getItem("tokens");

    if (storedData) {
      const storedObj = JSON.parse(storedData);
      const mainnetTokenMap =
        storedObj.mainnetBeta === undefined
          ? initialTokens.mainnetBeta
          : new Map<string, TokenInfo>(JSON.parse(storedObj.mainnetBeta));
      const devnetTokenMap =
        storedObj.devnet === undefined
          ? initialTokens.devnet
          : new Map<string, TokenInfo>(JSON.parse(storedObj.devnet));
      const testnetTokenMap =
        storedObj.testnet === undefined
          ? initialTokens.testnet
          : new Map<string, TokenInfo>(JSON.parse(storedObj.testnet));
      const lastUpd =
        storedObj.lastUpdated === undefined
          ? initialTokens.lastUpdated
          : storedObj.lastUpdated;
      tokens = {
        lastUpdated: lastUpd,
        mainnetBeta: mainnetTokenMap,
        devnet: devnetTokenMap,
        testnet: testnetTokenMap,
      };
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
  console.log("writing to storage");
  window.localStorage.setItem(
    "tokens",
    JSON.stringify({
      lastUpdated: tokens.lastUpdated,
      mainnetBeta: tokenMapToArray(tokens.mainnetBeta),
      devnet: tokenMapToArray(tokens.devnet),
      testnet: tokenMapToArray(tokens.testnet),
    })
  );
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
    if (restoreTokens === null) {
      fetchTokens();
    } else if (
      tokens.mainnetBeta.size === 0 ||
      tokens.devnet.size === 0 ||
      tokens.testnet.size === 0
    ) {
      fetchTokens();
    } else {
      saveTokens(restoredTokens);
    }
  }, []);

  const fetchTokens = async (): Promise<void> => {
    new TokenListProvider().resolve().then((tokens) => {
      const maintokenList = tokens
        .filterByChainId(SolanaENV.MainnetBeta)
        .getList();

      const mainTokenMap = mapTokenList(maintokenList);
      const devnetList = tokens.filterByChainId(SolanaENV.Devnet).getList();
      const devnetTokenMap = mapTokenList(devnetList);
      const testnetList = tokens.filterByChainId(SolanaENV.Testnet).getList();
      const testnetTokenMap = mapTokenList(testnetList);
      const t: Tokens = {
        lastUpdated: Date.now(),
        mainnetBeta: mainTokenMap,
        devnet: devnetTokenMap,
        testnet: testnetTokenMap,
      };
      setTokens(t);
      storeTokens(t);
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

export const TokensConsumer = TokensContext.Consumer;

export default TokensContext;
