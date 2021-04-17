import { useContext } from 'react';
import AuthContext from '../contexts/SolanaContext';

const useAuth = (): any => useContext(AuthContext);

export default useAuth;
