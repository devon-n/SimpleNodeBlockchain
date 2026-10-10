import sha256 from 'crypto-js/sha256';
import { Transaction } from './Transactions.ts';

class CryptoBlock {

  public timestamp: string;
  public transactions: Transaction[];
  public preceedingHash: string;
  public hash: string;
  public nonce: number;

  constructor(
    timestamp: string,
    transactions: Transaction[],
    preceedingHash: string = " "
  ) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.preceedingHash = preceedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash(): string {
    return sha256(
      this.preceedingHash +
      this.timestamp +
      JSON.stringify(this.transactions) +
      this.nonce
    ).toString();
  }

  public mineBlock(difficulty: number): void {
    while (
      this.hash.substring(0, difficulty) !==
      Array(difficulty + 1).join("0")
    ) {
      this.nonce++
      this.hash = this.computeHash();
    }
  }

}

export { CryptoBlock };
