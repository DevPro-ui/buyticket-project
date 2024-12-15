import { Lucid } from "lucid-cardano";
import { TransactionResult } from "../types/Transaction";

export const validateAddress = (address: string): boolean => {
  // Basic validation - can be enhanced based on Cardano address format
  return address.length > 0 && address.startsWith("addr");
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && Number.isFinite(amount);
};

export async function transferTokens(
  lucid: Lucid,
  recipientAddress: string,
  amountInAda: number
): Promise<TransactionResult> {
  try {
    const lovelaceAmount = BigInt(amountInAda * 1_000_000);

    const tx = await lucid
      .newTx()
      .payToAddress(recipientAddress, { lovelace: lovelaceAmount })
      .complete();

    const signedTx = await tx.sign().complete();
    const txHash = await signedTx.submit();

    return {
      txHash,
      success: true,
    };
  } catch (error) {
    return {
      txHash: "",
      success: false,
      error: error instanceof Error ? error.message : "Transaction failed",
    };
  }
}
