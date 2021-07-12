import { useContext } from "react";
import TokensContext from "../contexts/TokensContext";
import type { TokensContextValue } from "../contexts/TokensContext";

const useTokens = (): TokensContextValue => useContext(TokensContext);

export default useTokens;

// import { useState, useEffect } from "react";
// import {
//   TokenListProvider,
//   TokenInfo,
//   ENV as SolanaENV,
// } from "@solana/spl-token-registry";
// import useLocalStorage from "./useLocalStorage";

// type TokenCache = {
//   lastUpdated: Number;
//   tokens: Map<string, TokenInfo>;
// };

// const defaultTokenSettings: TokenCache = {
//   lastUpdated: 0,
//   tokens: <Map<string, TokenInfo>>new Map(),
// };

// const useTokens = () => {
//   const [tokenMap, setTokenMap] = useLocalStorage(
//     "tokens",
//     JSON.stringify(defaultTokenSettings)
//   );

//   useEffect(() => {
//     fetchTokens();
//   }, []);

//   const fetchTokens = () => {
//     new TokenListProvider().resolve().then((tokens) => {
//       const tokenList = tokens.filterByChainId(SolanaENV.MainnetBeta).getList();

//       setTokenMap({
//         lastUpdated: Date.now(),
//         tokens: tokenList.reduce((map, item) => {
//           map.set(item.address, item);
//           return map;
//         }, new Map()),
//       });
//     });
//   };

//   return { tokenMap };
// };

// export default useTokens;
