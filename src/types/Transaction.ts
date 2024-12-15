export interface TransferFormData {
  recipientAddress: string;
  amount: number;
}

export interface TransactionResult {
  txHash: string;
  success: boolean;
  error?: string;
}
