# EVM Bootcamp Q1 - Week 3 Group Project

This repository contains the deliverable for a group activity as part of the EVM Bootcamp Q1. The project focuses on developing a tokenized voting system using two smart contracts: `MyToken.sol` (ERC20 token with voting capabilities) and `TokenizedBallot.sol` (voting contract that uses token balances for voting power).

The main goal is to implement a voting system where voting power is proportional to token holdings at a specific block number, allowing for token-weighted voting with delegation capabilities.

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
npx ts-node --files ./scripts/DeployToken.ts
```

### Deploy TokenizedBallot Contract
```bash
npx ts-node --files ./scripts/DeployBallot.ts <tokenAddress> <targetBlockNumber> "Proposal1" "Proposal2" "Proposal3"
```

### Mint Tokens
```bash
npx ts-node --files ./scripts/MintTokens.ts <tokenAddress> <recipientAddress> <amount>
```

### Cast Vote
```bash
npx ts-node --files ./scripts/CastVote.ts <ballotAddress> <proposalIndex> <amount>
```

### Delegate Vote
```bash
npx ts-node --files ./scripts/DelegateVote.ts <ballotAddress> <delegateAddress>
```

## Deployed Contracts

- TokenizedBallot Contract: [0x70997970c51812dc3a010c7d01b50e0d17dc79c8](https://sepolia.etherscan.io/address/0x70997970c51812dc3a010c7d01b50e0d17dc79c8)

## Technologies Used

- **Solidity** - Smart contract programming language
- **OpenZeppelin** - Smart contract development framework
- **TypeScript** - Scripting for smart contract interaction
- **Hardhat** - Ethereum development environment
- **Alchemy** - RPC API for Ethereum blockchain data

## Contributors

- **Tsar-Odragde** - HSWW8s
- **jjmaloth** - GMm8Id
- **TAUFIQ HIDAYAH** - JH2nHs

## License

This project is open source and available under the [MIT License](LICENSE).
