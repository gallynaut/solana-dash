import type { Network } from './types/network'
import type { Wallet } from './types/wallet'
import { Connection, clusterApiUrl, Cluster } from '@solana/web3.js';

export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SOLANA: 'SOLANA'
};

const sollet: Wallet = {
  url: 'https://www.sollet.io',
  label: 'sollet',
}
const other: Wallet = {
  url: 'https://www.solanadash.io',
  label: 'other',
}
export const WALLETS: Wallet[] = [sollet, other]
//   sollet: sollet,
//   other: other,
// }

const dev: Cluster = 'devnet'
const test: Cluster = 'testnet'
const main: Cluster = 'mainnet-beta'

const devnet: Network = {
  icon: 'yellow',
  label: 'Devnet',
  cluster: dev,
  url: clusterApiUrl('devnet'),
}
const testnet: Network = {
  icon: 'orange',
  label: 'Testnet',
  cluster: test,
  url: clusterApiUrl('testnet'),
}
const mainnetBeta: Network = {
  icon: 'green',
  label: 'Mainnet-Beta',
  cluster: main,
  url: clusterApiUrl('mainnet-beta'),
}

export const NETWORKS = {
  mainnetBeta: mainnetBeta,
  devnet: devnet,
  testnet: testnet,
};

