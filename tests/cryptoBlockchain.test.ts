import { beforeAll, expect, test } from 'bun:test';
import { CryptoBlockchain } from '../CryptoBlockchain';
import { CryptoBlock } from '../CryptoBlock';
import { Transaction } from '../Transaction';
import { generateKeys } from '../keyGenerator';

let crypto: CryptoBlockchain;
const miningRewardAddress: string = "miner";
const { publicKey: publicKey1, key: key1 } = generateKeys();
const { publicKey: publicKey2 } = generateKeys();
const sendingAmount: number = 50;

beforeAll((): void => {
  crypto = new CryptoBlockchain();
})

test("Blockchain add a new block", (): void => {
  const transaction: Transaction = new Transaction(
    publicKey1,
    publicKey2,
    sendingAmount
  )

  transaction.signTransaction(key1);

  crypto.addTransaction(transaction);
  expect(crypto.pendingTransactions.length).toEqual(1);

  crypto.minePendingTransactions(miningRewardAddress)

  const latestBlock: CryptoBlock | undefined = crypto.obtainLastBlock();
  expect(latestBlock).toBeDefined()
  expect(crypto.blockchain.length).toEqual(2);
  expect(latestBlock?.transactions[0]).toEqual(transaction);

  const senderBalance: number = crypto.getBalance(publicKey1);
  const receiverBalance: number = crypto.getBalance(publicKey2);
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

test("Blockchain should not report valid if tampered with", (): void => {
  const transaction: Transaction | undefined = crypto.blockchain[1]?.transactions[0]
  if (!transaction) throw new Error("Block should have been mined");
  transaction.amount = (sendingAmount * 2);
  expect(crypto.checkChainValidity()).toBeFalse();
})
