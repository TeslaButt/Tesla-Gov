import { TransactionBuilder, Networks, xdr } from '@stellar/stellar-sdk';

/**
 * Mock utility for decoding a transaction XDR.
 * In a real scenario, this would decode Soroban contract invocations
 * to update the indexer's database with new votes/proposals.
 */
export function decodeTransactionXdr(base64Xdr: string) {
  try {
    const tx = new xdr.TransactionEnvelope(Buffer.from(base64Xdr, 'base64'));
    return tx;
  } catch (error) {
    console.error('Failed to decode XDR:', error);
    return null;
  }
}
