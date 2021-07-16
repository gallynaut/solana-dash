import { TokenInfo } from "@solana/spl-token-registry";

export interface TokenData {
  name: string;
  symbol: string;
  key: string;
  website?: string;
  gecko?: string;
  telegram?: string;
  github?: string;
  twitter?: string;
  medium?: string;
}

export function createData(
  name: string,
  symbol: string,
  key: string,
  extensions: string[]
): TokenData {
  // const keyButton = <PublicKeyButton publicKey={key} />;
  return { name, symbol, key, ...extensions };
}
export const getExtensions = (t: TokenInfo): any => {
  let website = "";
  let gecko = "";
  let telegram = "";
  let github = "";
  let twitter = "";
  let medium = "";
  if (typeof t.extensions !== "undefined") {
    if (typeof t.extensions.website !== "undefined") {
      website = t.extensions.website;
    }
    if (typeof t.extensions.coingeckoId !== "undefined") {
      gecko = t.extensions.coingeckoId;
    }
    if (typeof t.extensions.tgann !== "undefined") {
      telegram = t.extensions.tgann;
    }
    if (typeof t.extensions.github !== "undefined") {
      github = t.extensions.github;
    }
    if (typeof t.extensions.twitter !== "undefined") {
      twitter = t.extensions.twitter;
    }
    if (typeof t.extensions.medium !== "undefined") {
      medium = t.extensions.medium;
    }
  }
  return { website, gecko, telegram, github, twitter, medium };
};

const getAllTags = (tokenList: TokenInfo[]) => {
  const allTags: string[] = [];

  tokenList.forEach((t) => {
    if (typeof t.tags !== "undefined") {
      allTags.concat(t.tags);
    }
  });
  // return allTags.filter((value, index) => allTags.indexOf(value) === index);
  return allTags;
};

export const ALL_TAGS = [
  "stablecoin",
  "wrapped",
  "wormhole",
  "lp-token",
  "leveraged",
  "bull",
  "bear",
  "meme",
  "nft",
  "utility-token",
  "game-coin",
  "trading",
];

export const containsTag = (t: TokenInfo, tags: string[]): boolean => {
  if (typeof t.tags === "undefined") {
    return false;
  }
  // should break out more efficiently
  let isFound = false;
  tags.forEach((t1) => {
    t.tags.forEach((t2) => {
      if (t1 === t2) {
        isFound = true;
      }
    });
  });
  return isFound;
};

export const containsSearchTerm = (t: TokenInfo, s: string): boolean => {
  if (s === "") {
    return true;
  }
  if (
    t.name.toLowerCase().includes(s.toLowerCase()) ||
    t.symbol.toLowerCase().includes(s.toLowerCase())
  ) {
    return true;
  }
  return false;
};
export const containsGecko = (t: TokenInfo): string => {
  if (
    typeof t.extensions !== "undefined" &&
    typeof t.extensions.coingeckoId !== "undefined"
  ) {
    return t.extensions.coingeckoId;
  }
  return "";
};

export interface TokenColumn {
  id: "name" | "symbol" | "key" | "website";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export const TokenColumns: TokenColumn[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "symbol", label: "Symbol", minWidth: 100 },
  {
    id: "key",
    label: "Public Key",
    minWidth: 170,
  },
  {
    id: "website",
    label: "Website",
    minWidth: 170,
  },
];
