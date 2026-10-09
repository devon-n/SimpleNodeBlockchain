import sha256 from 'crypto-js/sha256';

class CryptoBlock {

  public index: number;
  public timestamp: string;
  public data: object;
  public preceedingHash: string;
  public hash: string;
  public nonce: number;

  constructor(
    index: number,
    timestamp: string,
    data: object,
    preceedingHash: string = " "
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.preceedingHash = preceedingHash;
    this.hash = this.computeHash();
    this.nonce = 0;
  }

  computeHash() {
    return sha256(
      this.index +
      this.preceedingHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }

  public proofOfWork(difficulty: number): void {
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
