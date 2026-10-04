import { CryptoBlockchain } from './CryptoBlockchain.ts';
import { CryptoBlock } from './CryptoBlock.ts';

let smashingCoin = new CryptoBlockchain();
smashingCoin.addNewBlock(
  new CryptoBlock(
      1,
      new Date(),
      {
        sender: "User1",
        recipient: "User2",
        quantity: 50
      }
  )
)
smashingCoin.addNewBlock(
  new CryptoBlock(
      2,
      new Date(),
      {
        sender: "User2",
        recipient: "User3",
        quantity: 100
      }
  )
)
console.log(smashingCoin)


function checkChainValidity(blockchain: CryptoBlockchain): boolean {
  for (let i = 1; i < blockchain.length; i++) {
    console.log(1)
    const currentBlock: CryptoBlock = blockchain[i];
    const previousBlock: CryptoBlock = blockchain[i - 1];

    if (currentBlock.hash !== currentBlock.computeHash()) {
      return false;
    }

    if (currentBlock.preceedingHash !== previousBlock.hash) {
      return false;
    }

  }
  return true;
}

console.log(checkChainValidity(smashingCoin));
