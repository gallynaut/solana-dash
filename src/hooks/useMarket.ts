import { useState } from "react";
import { Market } from "../types/market";

const useMarket = () => {
  const [exchange, setExchange] = useState<string>("ftx");
  const [symbol, setSymbol] = useState<string>("solusd");

  return { exchange, setExchange, symbol, setSymbol };
};

export default useMarket;
