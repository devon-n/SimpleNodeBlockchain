import { CryptoBlock } from "./CryptoBlock.ts"

class CryptoBlockchain {
  public blockchain: CryptoBlock[];
  public difficulty: number;

  constructor() {
    this.blockchain = [this.startGenesisBlock()];
    this.difficulty = 4
  }

  private startGenesisBlock(): CryptoBlock {
    return new CryptoBlock(
      0,
      new Date().toDateString(),
      { init: true },
      "0"
    )
  }

  public obtainLastBlock(): CryptoBlock | undefined {
    return this.blockchain[this.blockchain.length - 1];
  }

  public addNewBlock(newBlock: CryptoBlock): void {
    newBlock.preceedingHash = this.obtainLastBlock()?.hash || '';
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
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
