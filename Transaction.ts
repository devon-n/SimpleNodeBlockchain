import sha256 from 'crypto-js/sha256';
import { ec } from 'elliptic';

// TODO duplicated in keyGenerator
const ecSecp = new ec('secp256k1');

class Transaction {
  public fromAddress: string;
  public toAddress: string;
  public amount: number;
  public signature: string | undefined;

  constructor(
    fromAddress: string,
    toAddress: string,
    amount: number
  ) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  public calculateHash(): string {
    return sha256(
      this.fromAddress +
      this.toAddress +
      this.amount
    ).toString();
  }

  public signTransaction(signingKey: ec.KeyPair) {
    if (signingKey.getPublic('hex') !== this.fromAddress) throw Error("Invalid Signer");

    const hashTx: string = this.calculateHash();
    const signature: ec.Signature = signingKey.sign(hashTx, 'base64');
    this.signature = signature.toDER('hex');
  }

  public isValid(): boolean {
    // Make zero address a var and import it
    if (this.fromAddress === '0x0') return true; // TODO anyone can mint from fromAddress 

    if (!this.signature || this.signature.length === 0) {
      throw new Error("Invalid Signature");
    }

    const publicKey = ecSecp.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

export { Transaction };
