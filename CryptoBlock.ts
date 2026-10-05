import sha256 from 'crypto-js/sha256';

class CryptoBlock {
    constructor(
      index: number,
      timestamp: string,
      data: string,
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

    public proofOfWork(difficulty) {
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
