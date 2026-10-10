import { CryptoBlock } from "./CryptoBlock.ts"
import { Transaction } from "./Transactions.ts";

class CryptoBlockchain {
  public blockchain: CryptoBlock[];
  public difficulty: number;
  public pendingTransactions: Transaction[];
  public miningReward: number;

  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  private startGenesisBlock(): CryptoBlock {
    return new CryptoBlock(
      new Date().toDateString(),
      [{
        fromAddress: '0x0',
        toAddress: '0x0',
        amount: 0
      }],
      "0"
    )
  }

  public obtainLastBlock(): CryptoBlock | undefined {
    return this.blockchain[this.blockchain.length - 1];
  }

  public createTransaction(transaction: Transaction): void {
    this.pendingTransactions.push(transaction);
  }

  public minePendingTransactions(miningRewardAddress: string): void {

    if (this.pendingTransactions.length === 0) return;

    const preceedingHash: string | undefined = this.obtainLastBlock()?.hash;
    if (!preceedingHash) return;

    const block = new CryptoBlock(
      new Date().toDateString(),
      this.pendingTransactions,
      preceedingHash
    )
    block.mineBlock(this.difficulty);

    this.blockchain.push(block);

    this.pendingTransactions = [
      new Transaction(
        '0x0',
        miningRewardAddress,
        this.miningReward,
      )
    ];
  }

  public getBalance(address: string): number {
    let balance: number = 0;

    for (const block of this.blockchain) {
      for (const transaction of block.transactions) {
        if (transaction.fromAddress === address) {
          balance -= transaction.amount;
        }

        if (transaction.toAddress === address) {
          balance += transaction.amount;
        }
      }
    }

    return balance;
  }


  public checkChainValidity(): boolean {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock: CryptoBlock | undefined = this.blockchain[i];
      const previousBlock: CryptoBlock | undefined = this.blockchain[i - 1];

      if (!currentBlock || !previousBlock) continue;

      if (currentBlock.hash !== currentBlock.computeHash()) {
        return false;
      }

      if (currentBlock.preceedingHash !== previousBlock.hash) {
        return false;
      }

    }
    return true;
  }
}

export { CryptoBlockchain };
