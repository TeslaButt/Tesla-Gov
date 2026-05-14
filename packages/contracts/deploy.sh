#!/bin/bash
set -e

echo "Compiling Soroban contract..."
cargo build --target wasm32-unknown-unknown --release

echo "Deploying to Stellar Testnet..."
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/tesla_gov_contract.wasm \
  --source default \
  --network testnet

echo "Deployment complete."
