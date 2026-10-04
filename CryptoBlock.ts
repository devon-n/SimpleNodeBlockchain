import sha256 from 'crypto-js/sha256';

class CryptoBlock {
    constructor(
      index: number,
      timestamp: string,
      data: string,
      preceedingHash: string
    ) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.preceedingHash = preceedingHash;
        this.hash = this.computeHash();
      }

    computeHash() {
        return sha256(
          this.index,
          this.preceedingHash,
          this.timestamp,
          JSON.stringify(this.data)
        ).toString();
      }
}

export { CryptoBlock };
