
const shortenPublicKey = (pk: string): string => {
    return pk.substring(0,3)+ '...' + pk.substring(pk.length-5)
  };

export default shortenPublicKey;
  