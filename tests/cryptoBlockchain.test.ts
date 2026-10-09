import { beforeAll, expect, test } from 'bun:test';
import { CryptoBlockchain } from '../CryptoBlockchain';
import { CryptoBlock } from '../CryptoBlock';

let crypto: CryptoBlockchain;

beforeAll((): void => {
  crypto = new CryptoBlockchain();
})

test("Blockchain should add a new block", (): void => {
  const index: number = 1;
  const latestDate: string = new Date().toDateString();
  const data: object = {
    sender: "User1",
    recipient: "User2",
    quantity: 50
  }

  const newBlock: CryptoBlock = new CryptoBlock(
    index,
    latestDate,
    data
  )
  crypto.addNewBlock(newBlock)

  const latestBlock: CryptoBlock | undefined = crypto.obtainLastBlock();
  expect(crypto.blockchain.length).toEqual(index + 1);
  expect(latestBlock).toBeDefined()
  expect(latestBlock?.index).toBe(index);
  expect(latestBlock?.timestamp).toEqual(latestDate);
  expect(latestBlock?.data).toEqual(data);
})



test("Blockchain should add a second block", (): void => {
  const index: number = 2;
  const latestDate: string = new Date().toDateString();
  const data: object = {
    sender: "User2",
    recipient: "User3",
    quantity: 50
  }

  const newBlock: CryptoBlock = new CryptoBlock(
    index,
    latestDate,
    data
  )
  crypto.addNewBlock(newBlock)

  const latestBlock: CryptoBlock | undefined = crypto.obtainLastBlock();
  expect(latestBlock).toBeDefined()
  expect(crypto.blockchain.length).toEqual(index + 1);
  expect(latestBlock?.index).toBe(index);
  expect(latestBlock?.timestamp).toEqual(latestDate);
  expect(latestBlock?.data).toEqual(data);
})

test("Blockchain should add blocks sequentially", (): void => {
  expect(crypto.checkChainValidity()).toBeTrue();
})
