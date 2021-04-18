import { PublicKey } from '@project-serum/sol-wallet-adapter';

const shortenPublicKey = (pk: string, firstN: number, lastN: number): string => {
  return pk.substring(0, firstN) + '...' + pk.substring(pk.length - lastN)
};

export default shortenPublicKey;
