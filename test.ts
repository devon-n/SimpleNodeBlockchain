import { CryptoBlockchain } from './CryptoBlockchain.ts';
import { CryptoBlock } from './CryptoBlock.ts';

let smashingCoin = new CryptoBlockchain();
smashingCoin.addNewBlock(
  new CryptoBlock(
    1,
    new Date().toDateString(),
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
    new Date().toDateString(),
    {
      sender: "User2",
      recipient: "User3",
      quantity: 100
    }
  )
)
console.log(smashingCoin)



console.log(smashingCoin.checkChainValidity());


