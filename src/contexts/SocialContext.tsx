import { createContext, useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import PropTypes from "prop-types";
import {
  TokenListProvider,
  TokenInfo,
  ENV as SolanaENV,
} from "@solana/spl-token-registry";
import axios from "axios";
import { getSite } from "../types/TokenData";
import useInterval from "../hooks/useInterval";

const domain = "http://localhost:8000";

interface SocialTrend {
  lastUpdated: Number;
  trends: Array<string>; // trend data
}

export interface SocialContextValue {
  Social: SocialTrend[];
  fetchSocial: (trend1: string, trend2: string) => Promise<void>;
}

interface SocialProviderProps {
  children?: ReactNode;
}

const initialSocial: SocialTrend[] = [];

export const restoreSocial = (): SocialTrend[] | null => {
  let Social: SocialTrend[] | null = null;

  try {
    const storedData: string | null = window.localStorage.getItem("Social");

    if (storedData) {
      const storedObj = JSON.parse(storedData);
      const socialMap =
        storedObj.trends === undefined
          ? initialSocial
          : new Array<string>(JSON.parse(storedObj.trends));
    } else {
      Social = initialSocial;
    }
  } catch (err) {
    console.error(err);
    // If stored data is not a strigified JSON this will fail,
    // that's why we catch the error
  }
  return Social;
};

export const storeSocial = (Social: SocialTrend[]): void => {
  window.localStorage.setItem("Social", JSON.stringify(Social));
};

const SocialContext = createContext<SocialContextValue>({
  Social: initialSocial,
  fetchSocial: (trend1: string, trend2: string) => Promise.resolve(),
});

export const SocialProvider: FC<SocialProviderProps> = (props) => {
  const { children } = props;
  const [Social, setSocial] = useState<SocialTrend[]>(initialSocial);
  const fetchSocial = async (
    trend1: string,
    trend2: string
  ): Promise<void> => {};

  // useEffect(() => {
  //   const restoredSocial = restoreSocial();
  //   // if (restoreSocial === null) {
  //   //   fetchSocial();
  //   // } else if (Social.length === 0) {
  //   //   fetchSocial();
  //   // } else {
  //   //   saveSocial(restoredSocial);
  //   // }
  //   fetchSocial("solana", "ethereum");
  // }, []);

  // const fetchSocial = async (trend1: string, trend2: string): Promise<void> => {
  //   try {
  //     console.log("dispatched");

  //     const result = await axios.get(`${domain}/${trend1}/${trend2}`);
  //     // const result2 = await axios.get(`${domain}/${trend2}`)
  //     console.log(result.data);
  //     // dispatch({
  //     //   type: "TREND_RECEIVED",
  //     //   payload: result.data,
  //     // });
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.data.errors);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       /*
  //        * The request was made but no response was received, `error.request`
  //        * is an instance of XMLHttpRequest in the browser and an instance
  //        * of http.ClientRequest in Node.js
  //        */
  //       console.log(error.request);
  //     } else {
  //       console.log("Error", error.message);
  //     }
  //     console.log(error);

  //     // dispatch({
  //     //   type: "TREND_ERROR",
  //     // });
  //   }
  // };
  const addTrend = (result: SocialTrend): void => {
    setSocial([...Social, result]);
  };

  const saveSocial = (updatedSocial: SocialTrend[]): void => {
    setSocial(updatedSocial);
    storeSocial(updatedSocial);
  };

  return (
    <SocialContext.Provider
      value={{
        Social,
        fetchSocial,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

SocialProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// need to look at
const mapSocialList = (tokenList: TokenInfo[]): Map<string, TokenInfo> => {
  const tokenMap = tokenList.reduce((map, item) => {
    map.set(item.address, item);
    return map;
  }, new Map());
  return tokenMap;
};

export const SocialConsumer = SocialContext.Consumer;

export default SocialContext;
