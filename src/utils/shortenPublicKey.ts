import { PublicKey } from '@project-serum/sol-wallet-adapter';

const shortenPublicKey = (pk: PublicKey, firstN: number, lastN: number): string => {
  if (pk != null && pk != '') {
    const pkStr: string = pk.toBase58()
    if (pkStr != '') {
      return pk.substring(0, firstN) + '...' + pk.substring(pk.length - lastN)
    }
  }
  return ''
};

export default shortenPublicKey;
