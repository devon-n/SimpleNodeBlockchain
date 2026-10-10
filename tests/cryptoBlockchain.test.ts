import { beforeAll, expect, test } from 'bun:test';
import { CryptoBlockchain } from '../CryptoBlockchain';
import { CryptoBlock } from '../CryptoBlock';
import { Transaction } from '../Transactions';

let crypto: CryptoBlockchain;
const miningRewardAddress: string = "miner";
const account1: string = "account1";
const account2: string = "account2";

beforeAll((): void => {
  crypto = new CryptoBlockchain();
})

test("Blockchain add a new block", (): void => {
  const sendingAmount: number = 50;
  const transaction: Transaction = {
    fromAddress: account1,
    toAddress: account2,
    amount: sendingAmount
  }

  crypto.createTransaction(transaction);
  expect(crypto.pendingTransactions.length).toEqual(1);

  crypto.minePendingTransactions(miningRewardAddress)

  const latestBlock: CryptoBlock | undefined = crypto.obtainLastBlock();
  expect(latestBlock).toBeDefined()
  expect(crypto.blockchain.length).toEqual(2);
  expect(latestBlock?.transactions[0]).toEqual(transaction);

  const senderBalance: number = crypto.getBalance(account1);
  const receiverBalance: number = crypto.getBalance(account2);
  expect(senderBalance).toEqual(-sendingAmount);
  expect(receiverBalance).toEqual(sendingAmount);
})



test("Blockchain should send rewards to mining address", (): void => {
  crypto.minePendingTransactions(miningRewardAddress)

  const latestBlock: CryptoBlock | undefined = crypto.obtainLastBlock();
  expect(latestBlock).toBeDefined()
  expect(crypto.blockchain.length).toEqual(3);

  const minerBalance: number = crypto.getBalance(miningRewardAddress);
  expect(minerBalance).toEqual(crypto.miningReward);
})

test("Blockchain should add blocks sequentially", (): void => {
  expect(crypto.checkChainValidity()).toBeTrue();
})
