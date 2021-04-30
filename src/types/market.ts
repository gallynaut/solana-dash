export interface Exchange {
  name: string;
  symbols: string[];
}

export interface Market {
  exchange: string;
  symbol: string;
}
