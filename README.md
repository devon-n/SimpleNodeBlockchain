# SimpleNodeBlockchain

Minimal TypeScript (Bun) blockchain demo, following [this Smashing Magazine article](https://www.smashingmagazine.com/2020/02/cryptocurrency-blockchain-node-js/).

- `CryptoBlock` — one block: index, timestamp, data, previous hash, nonce, SHA-256 hash, and proof-of-work
- `CryptoBlockchain` — chain of blocks, starts with a genesis block, mines each new block at a set difficulty
- `test.ts` — builds a short chain of transfers and checks the chain is still valid

## Install

```bash
bun install
```

## Run

```bash
bun test.ts
```
