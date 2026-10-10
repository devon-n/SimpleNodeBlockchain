# SimpleNodeBlockchain

Minimal TypeScript (Bun) blockchain demo.

Based on:

- [Smashing Magazine article](https://www.smashingmagazine.com/2020/02/cryptocurrency-blockchain-node-js/)
- [SavjeeCoin YouTube playlist](https://www.youtube.com/playlist?list=PLzvRQMJhHDiTqZmbtFisdXFxul5k0F-Q4)

- `Transaction` — from/to address and amount
- `CryptoBlock` — timestamp, transactions, previous hash, nonce, SHA-256 hash, and mining (proof-of-work)
- `CryptoBlockchain` — genesis block, pending transactions, mining rewards, balances, and chain validity
- `tests/` — bun:test coverage for mining and rewards

## Install

```bash
bun install
```

## Run

```bash
bun test
```
