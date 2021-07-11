import { Cluster } from "@solana/web3.js";

export interface Network {
  icon: string;
  label: string;
  cluster: Cluster;
  url: string;
}
