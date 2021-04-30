import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const lamportsToSol = (lamports: number, precision?: string): string => {
  const sol: number = lamports ? lamports / LAMPORTS_PER_SOL : null;
  if (sol === null) {
    return "N/A";
  }
  switch (precision) {
    case "M": {
      return (sol / 1000000).toFixed(2).concat("M");
    }
    case "K": {
      return (sol / 1000).toFixed(2).concat("K");
    }
    default: {
      return sol.toFixed(0);
    }
  }
};

export default lamportsToSol;
