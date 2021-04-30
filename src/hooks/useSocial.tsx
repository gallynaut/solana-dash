import { useState } from "react";

const useSocial = () => {
  const [keyword, setKeyword] = useState<string>("solana");

  return { keyword, setKeyword };
};

export default useSocial;
