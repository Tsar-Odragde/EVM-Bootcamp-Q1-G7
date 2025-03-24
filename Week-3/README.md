# EVM Bootcamp Q1 - Week 3 Group Project

This repository contains the deliverable for a group activity as part of the EVM Bootcamp Q1. The project focuses on developing a tokenized voting system using two smart contracts: `MyToken.sol` (ERC20 token with voting capabilities) and `TokenizedBallot.sol` (voting contract that uses token balances snapshots for voting power).

The main goal is to implement a community-driven governating voting system where voting power is proportional to token holdings at a specific block number, allowing for token-weighted voting with delegation capabilities.

## Project Requirements

- Develop and deploy two smart contracts:
  - [x] `MyToken.sol`: ERC20 token with voting capabilities
  - [x] `TokenizedBallot.sol`: Voting contract using token balances

- Implement core functionalities:
  - [x] Token minting and distribution
  - [x] Voting with token-weighted power
  - [x] Vote delegation
  - [x] Querying voting results

- [x] Deploy contracts to Sepolia testnet
- [x] Document all transactions and interactions

## Project Structure

```
Week-3/
├── contracts/
│   ├── MyToken.sol
│   └── TokenizedBallot.sol
├── scripts/
│   ├── MyTokenDeploy.ts
│   ├── TokenizedBallotDeploy.ts
│   ├── Mint.ts
│   ├── CastVote.ts
│   ├── Delegate.ts
│   ├── CheckVotingPower.ts
│   ├── QueryResults.ts
│   └── TestVoteToken.ts
├── ignition/
├── test/
├── package.json
├── package-lock.json
├── tsconfig.json
├── hardhat.config.ts
├── .mocharc.json
└── .env
```

## Contract Details

### MyToken.sol
- ERC20 token with voting capabilities
- Implements OpenZeppelin's ERC20Votes extension
- Includes minting functionality for token distribution
- Tracks voting power based on token balances

### TokenizedBallot.sol
- Voting contract that uses token balances for voting power
- Supports multiple proposals
- Allows partial voting (using portion of voting power)
- Implements vote delegation
- Calculates winning proposal based on total votes

## Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/Tsar-Odragde/EVM-Bootcamp-Q1-G7.git
cd EVM-Bootcamp-Q1-G7/Week-3
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Environment Variables:**

Create a `.env` file in the `Week-3` directory containing:
```env
ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_wallet_private_key
```

## Using the Scripts

### Deploy MyToken Contract
```bash
npx ts-node --files ./scripts/MyTokenDeploy.ts
```

### Deploy TokenizedBallot Contract
```bash
npx ts-node --files ./scripts/TokenizedBallotDeploy.ts <tokenAddress> <proposal1,proposal2,...> <n-blocks-ago>""
```

### Mint Tokens
```bash
npx ts-node --files ./scripts/Mint.ts <tokenAddress> <recipientAddress> <amount>
```

### Cast Vote
```bash
npx ts-node --files ./scripts/CastVote.ts <ballotAddress> <proposalIndex> <amount>
```

### Delegate Vote  
Account's private key is required to delegate.
```bash
npx ts-node --files ./scripts/Delegate.ts <tokenAddress> <delegateAddress>
```

### Check Voting Power
```bash
npx ts-node --files ./scripts/CheckVotingPower.ts <tokenAddress> <ballotAddress> <voterAddress>
```

### Querying Results
```bash
npx ts-node --files ./scripts/QueryResults.ts <contractAddress>
```

## Reporting & Submission

- **Token Deployment:**  
  - [0x79d9a0e80704d6303ea63da6df5751704e453cb77b2aa6befca21c9576968f5a](https://sepolia.etherscan.io/tx/0x79d9a0e80704d6303ea63da6df5751704e453cb77b2aa6befca21c9576968f5a)

- **TokenizedBallot Deployment:**
  - [0x3056828ba783ba42ff3d36a5ac1a7b169192ba76d36f4bb89d35ecf5c428e939](https://sepolia.etherscan.io/tx/0x3056828ba783ba42ff3d36a5ac1a7b169192ba76d36f4bb89d35ecf5c428e939) 

- **Minting Tokens:**  
  - [0x4606d4e5bec58be0a3681cc58be96c0c165b013a080b4e6e3221c00ed7e3e568](https://sepolia.etherscan.io/tx/0x4606d4e5bec58be0a3681cc58be96c0c165b013a080b4e6e3221c00ed7e3e568)
  - [0x1d5db7e949336656db3b7567d930cb40ce52a6086a9991417659274dcf437af9](https://sepolia.etherscan.io/tx/0x1d5db7e949336656db3b7567d930cb40ce52a6086a9991417659274dcf437af9)
  - [0xc5866e6fca05bd9f993f2464405dd43d7b64543f1cf816622e0c855c7c9615a2](https://sepolia.etherscan.io/tx/0xc5866e6fca05bd9f993f2464405dd43d7b64543f1cf816622e0c855c7c9615a2)

- **Delegating Votes:**
  - [0x92b3d26fb9440592cc69e996e8c6377c2f784af928f119e3f63ceec5f826ff71](https://sepolia.etherscan.io/tx/0x92b3d26fb9440592cc69e996e8c6377c2f784af928f119e3f63ceec5f826ff71) - *Self-Delegating*
  - [0x23b1e3edb00d578469f7d8c0e3202673b7ea9dd03642b1a1ccdb9cfc72fd9579](https://sepolia.etherscan.io/tx/0x23b1e3edb00d578469f7d8c0e3202673b7ea9dd03642b1a1ccdb9cfc72fd9579)
  - [0x2fc031e1f371ab42da262385f23ce8d0eb5cce48ec9d1504b105790edc6eff64](https://sepolia.etherscan.io/tx/0x2fc031e1f371ab42da262385f23ce8d0eb5cce48ec9d1504b105790edc6eff64) - *Self-Delegating*
  - [0x3f73e9c6b2ab2e56d230b95cfd4b6226ec1e3f8de0c804bb0163bafbd173f296](https://sepolia.etherscan.io/tx/0x3f73e9c6b2ab2e56d230b95cfd4b6226ec1e3f8de0c804bb0163bafbd173f296) - *Self-Delegating*

- **Casting Votes:**
  - [0x04af4ed0f5b0904d09ba8224c574514272bd184e44ec274442f140cce22db749](https://sepolia.etherscan.io/tx/0x04af4ed0f5b0904d09ba8224c574514272bd184e44ec274442f140cce22db749)
  - [0x2a32e3876ede824f6b2732fd0e62d3dfe494a68e52c30c53b09d27cc0058cdba](https://sepolia.etherscan.io/tx/0x2a32e3876ede824f6b2732fd0e62d3dfe494a68e52c30c53b09d27cc0058cdba)


- **TokenizedBallot Contract:**  
  - [0x70997970c51812dc3a010c7d01b50e0d17dc79c8](https://sepolia.etherscan.io/address/0x70997970c51812dc3a010c7d01b50e0d17dc79c8)

## Technologies Used

- **Solidity** - Smart contract programming language
- **OpenZeppelin** - Smart contract development framework
- **Viem** - Ethereum client library for script execution
- **TypeScript** - Scripting for smart contract interaction
- **Hardhat** - Ethereum development environment
- **Alchemy** - RPC API for Ethereum blockchain data

## Contributors

- **Tsar-Odragde** - HSWW8s
- **jjmaloth** - GMm8Id
- **TAUFIQ HIDAYAH** - JH2nHs

## License

This project is open source and available under the [MIT License](LICENSE).
