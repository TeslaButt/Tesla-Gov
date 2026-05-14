# Tesla-Gov

A decentralized proposal and voting system (DAO) built for the Stellar ecosystem. 
Tesla-Gov provides frictionless governance for Stellar communities, allowing members to create on-chain proposals and cast "Yes" or "No" votes via their Stellar wallets.

Built by [teslabutt](https://github.com/teslabutt) (@AlAfiz) for the Stellar Drips Wave program.

## Architecture

This is a Turborepo monorepo consisting of:
- `packages/contracts`: Soroban smart contract managing proposals and votes.
- `packages/backend`: Fastify API serving as an off-chain indexer.
- `packages/frontend`: Next.js 14 web application for the Governance UI.

## Getting Started

### Prerequisites
- Node.js >= 18
- Rust and `cargo` (with `wasm32-unknown-unknown` target)
- Stellar CLI

### Installation

Clone the repository:
```bash
git clone https://github.com/teslabutt/Tesla-Gov
cd Tesla-Gov
```

Install dependencies and start the local environment:
```bash
npm install
npm run dev
```

Build all packages:
```bash
npm run build
```

## Contributing
See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get involved, particularly for Drips Wave contributors.
