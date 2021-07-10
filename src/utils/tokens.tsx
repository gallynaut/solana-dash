import React from "react";
import { Connection, PublicKey } from "@solana/web3.js";
import {
  Infer,
  number,
  optional,
  enums,
  any,
  boolean,
  string,
  array,
  type,
  nullable,
  coerce,
  create,
  instance,
} from "superstruct";

export const PublicKeyFromString = coerce(
  instance(PublicKey),
  string(),
  (value) => new PublicKey(value)
);

// export type TokenAccountType = Infer<typeof TokenAccountType>;
export const TokenAccountType = enums(["mint", "account", "multisig"]);

export type TokenAccountState = Infer<typeof AccountState>;
const AccountState = enums(["initialized", "uninitialized", "frozen"]);

const TokenAmount = type({
  decimals: number(),
  uiAmountString: string(),
  amount: string(),
});

// export type TokenAccountInfo = Infer<typeof TokenAccountInfo>;
export const TokenAccountInfo = type({
  mint: PublicKeyFromString,
  owner: PublicKeyFromString,
  tokenAmount: TokenAmount,
  delegate: optional(PublicKeyFromString),
  state: AccountState,
  isNative: boolean(),
  rentExemptReserve: optional(TokenAmount),
  delegatedAmount: optional(TokenAmount),
  closeAuthority: optional(PublicKeyFromString),
});

export type TokenInfoWithPubkey = {
  info: typeof TokenAccountInfo;
  pubkey: PublicKey;
};

interface AccountTokens {
  tokens?: TokenInfoWithPubkey[];
}

export const TOKEN_PROGRAM_ID = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);

export enum Cluster {
  MainnetBeta,
  Testnet,
  Devnet,
  Custom,
}

export async function fetchAccountTokens(
  pubkey: PublicKey,
  cluster: Cluster,
  url: string
) {
  const key = pubkey.toBase58();

  let status;
  let data;
  try {
    const { value } = await new Connection(
      url,
      "processed"
    ).getParsedTokenAccountsByOwner(pubkey, { programId: TOKEN_PROGRAM_ID });
    data = {
      tokens: value.map((accountInfo) => {
        const parsedInfo = accountInfo.account.data.parsed.info;
        const info = create(parsedInfo, TokenAccountInfo);
        return { info, pubkey: accountInfo.pubkey };
      }),
    };
    // status = FetchStatus.Fetched;
  } catch (error) {
    if (cluster !== Cluster.Custom) {
      // reportError(error, { url });
    }
    // status = FetchStatus.FetchFailed;
  }
}
