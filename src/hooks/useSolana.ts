import { useContext } from "react";
import AuthContext from "../contexts/SolanaContext";

const useSolana = (): any => useContext(AuthContext);

export default useSolana;
