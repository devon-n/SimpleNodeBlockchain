import { CryptoBlock } from "./CryptoBlock.ts"

class CryptoBlockchain {
  public blockchain: CryptoBlock[];

  constructor() {
    this.blockchain = [this.startGenesisBlock];
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
    newBlock.hash = newBlock.computeHash();
    this.blockchain.push(newBlock);
  }
}

export { CryptoBlockchain };
