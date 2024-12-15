import { Lucid } from "lucid-cardano";

export const formatLovelace = (lovelace: bigint): string => {
  return (Number(lovelace) / 1_000_000).toFixed(2);
};

export const lovelaceToAda = (ada: number): bigint => {
  return BigInt(ada * 1_000_000);
};

export const shortenAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 8)}...${address.slice(-8)}`;
};

export const createTransaction = async (
  lucid: Lucid,
  recipientAddress: string,
  amountInAda: number
) => {
  const lovelaceAmount = lovelaceToAda(amountInAda);

  const tx = await lucid
    .newTx()
    .payToAddress(recipientAddress, { lovelace: lovelaceAmount })
    .complete();

  return tx;
};
