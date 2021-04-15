import type { Network } from './types/network'
export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
  SOLANA: 'SOLANA'
};
// export const NETWORKS = {
//   DEVNET: 'DEVNET',
//   MAINNET_BETA: 'MAINNET_BETA'
// }
const devnet: Network = {
  icon: 'yellow',
  label: 'Devnet',
  url: 'https://devnet.solana.com',
  cluster: 'devnet'
}
const testnet: Network = {
  icon: 'orange',
  label: 'Testnet',
  url: 'https://testnet.solana.com',
  cluster: 'testnet'
}
const mainnetBeta: Network = {
  icon: 'green',
  label: 'Mainnet-Beta',
  url: 'https://api.mainnet-beta.solana.com',
  cluster: 'mainnet-beta'
}

export const NETWORKS = {
  devnet: devnet,
  testnet: testnet,
  mainnetBeta: mainnetBeta,
};