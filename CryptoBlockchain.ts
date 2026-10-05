import { CryptoBlock } from "./CryptoBlock.ts"

class CryptoBlockchain {
  public blockchain: CryptoBlock[];
  public difficulty: number;

  constructor() {
    this.blockchain = [this.startGenesisBlock];
    this.difficulty = 4
  }

  private startGenesisBlock(): void {
    return new CryptoBlock(
      0,
      new Date(),
      "Init",
      "0"
    )
  }

  public obtainLastBlock(): CryptoBlock {
    return this.blockchain[this.blockchain.length - 1];
  }

  public addNewBlock(newBlock: CryptoBlock): void {
    newBlock.preceedingHash = this.obtainLastBlock().hash;
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  }
}

export { CryptoBlockchain };
