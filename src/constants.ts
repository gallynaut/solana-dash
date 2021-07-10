import { Connection, clusterApiUrl, Cluster, PublicKey } from "@solana/web3.js";
import { string } from "prop-types";
// import { PublicKey } from "@project-serum/sol-wallet-adapter";
import type { Network } from "./types/network";
import type { Wallet } from "./types/wallet";
import { Exchange } from "./types/market";

export const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export const THEMES = {
  LIGHT: "LIGHT",
  DARK: "DARK",
  SOLANA: "SOLANA",
};

const sollet: Wallet = {
  url: "https://www.sollet.io",
  label: "sollet",
};
const phantom: Wallet = {
  url: "https://www.phantom.app",
  label: "phantom",
};
const other: Wallet = {
  url: "https://www.solanadash.io",
  label: "other",
};
export const WALLETS: Wallet[] = [sollet, phantom, other];

const dev: Cluster = "devnet";
const test: Cluster = "testnet";
const main: Cluster = "mainnet-beta";

const devnet: Network = {
  icon: "yellow",
  label: "Devnet",
  cluster: dev,
  url: clusterApiUrl("devnet"),
};
const testnet: Network = {
  icon: "orange",
  label: "Testnet",
  cluster: test,
  url: clusterApiUrl("testnet"),
};
const mainnetBeta: Network = {
  icon: "green",
  label: "Mainnet-Beta",
  cluster: main,
  url: clusterApiUrl("mainnet-beta"),
};

export const NETWORKS = {
  mainnetBeta,
  devnet,
  testnet,
};

export const EXCHANGES: Exchange[] = [
  {
    name: "ftx",
    symbols: ["solusd", "solusdt", "solbtc"],
  },
  {
    name: "binance",
    symbols: ["solusd", "solusdt", "solbtc"],
  },
];

export const CHART_THEMES = {
  STANDARD: "standard",
  CANDYCANE: "candycane",
  ALBUQUERQUE: "albuquerque",
  EPAPER: "epaper",
  DELEK: "delek",
  BLUEPRINT: "blueprint",
  BALLMER: "ballmer",
  BUSHIDO: "bushido",
  ISHIHARA: "ishihara",
};
