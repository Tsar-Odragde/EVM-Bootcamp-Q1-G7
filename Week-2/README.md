# EVM Bootcamp Q1 - Week 2 Group Project

This repository contains the deliverable for a group activity as part of the EVM Bootcamp Q1. The project focuses on developing scripts to interact with the provided Solidity smart contract `Ballot.sol`. 

The main goal is to manage voting functionalities, including giving voting rights, casting votes, delegating votes, and querying voting results. Each execution is documented with transaction hashes for successful transactions or revert reasons for failed ones.

## Project Requirements

- Develop and execute scripts for `Ballot.sol` to perform:
  - [x] Granting voting rights
  - [x] Casting votes
  - [x] Delegating votes
  - [x] Querying voting results

- Document each function execution clearly, noting:
  - [x] Transaction hashes for successful operations
  - [x] Revert reasons for any failed transactions

- [x] Submit the final report through the provided form in Discord.
- [x] Ensure the code is uploaded to a GitHub repository and linked appropriately.

## Project Structure

```
Week-2/
├── contracts/
│   └── Ballot.sol
├── scripts/
│   ├── DeployWithHardhat.ts
│   ├── DeployWithViem.ts
│   ├── VotingRights.ts
│   ├── CastVote.ts
│   └── FetchResults.ts
├── test/
│   └── Ballot.ts
├── package.json
└── .env
└── hardhat.config.ts
```

## Setup Instructions

1. **Clone the repository:**

```bash
git clone https://github.com/Tsar-Odragde/EVM-Bootcamp-Q1-G7.git
cd EVM-Bootcamp-Q1-G7/Week-2
```

2. **Install dependencies:**

```bash
npm install
```

3. **Configure Environment Variables:**

Create a `.env` file in the `Week-2` directory containing:

```env
ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_wallet_private_key
```

## Using the Scripts

### Deploy Ballot Contract

Deploy your contract with specified proposal names:

```bash
npx ts-node --files ./scripts/DeployWithHardhat.ts Proposal1 Proposal2 Proposal3
```

### Give Voting Rights

Grant voting rights to an address:

```bash
npx ts-node --files ./scripts/VotingRights.ts <contractAddress> <voterAddress> giveRightToVote
```

### Cast Vote

Vote for a specific proposal index:

```bash
npx ts-node --files ./scripts/CastVote.ts <contractAddress> <proposalIndex>
```

### Delegate Vote

Delegate your voting power to another voter:

```bash
npx ts-node --files ./scripts/DelegateVote.ts <contractAddress> <delegateAddress>
```

### Fetch Voting Results

Retrieve the current ballot results, including the winner:

```bash
npx ts-node --files ./scripts/FetchResults.ts <contractAddress>
```

## Technologies Used

- **Solidity** - Smart contract programming language
- **TypeScript** - Scripting for smart contract interaction
- **Viem** - Ethereum client library for script execution
- **Hardhat** - Ethereum development environment for smart contracts
- **Alchemy** - RPC API for Ethereum blockchain data

## Reporting & Submission

- **Contract Deployment:**  
    - https://sepolia.etherscan.io/tx/0x0b1e1e8b14c30fa61fdab47714df1b865d0a484bc32a4158d4c09ae4581213c3
    - https://sepolia.etherscan.io/tx/0xc9f5ca2211818844b23b94334d98d8bd29625ff742479e96cef64568c29d3db8
    - https://sepolia.etherscan.io/tx/0xc753f0a3b73de0644c40645ea48170d50e9ddb54fe4c6fb31a428ae674820fd7

- **Give Voting Rights:**  
    - https://sepolia.etherscan.io/tx/0xf9b387a30f2974ebb4f8e0c39a2d9400c8f98e326f7271a8ea149bb61bca9e4b
    - https://sepolia.etherscan.io/tx/0x33953f3f91696b050429544723a2f28add89181ed2e50fb7a3047c66aefac146
    - https://sepolia.etherscan.io/tx/0xeae471575f5c096600ddcccc9ac197c6e97cf8677b17d87e48142db4b5f94ab3
    - https://sepolia.etherscan.io/tx/0xf1d6f2f981babb95b06e7d798eb4cbaf4f2d66eeae1e409b75c4ff17c4002bac
    - https://sepolia.etherscan.io/tx/0xcca982e14cae27e8067e1e74740afdd3861aadc2348e9f57dd1411bf6e30b419

- **Cast Vote:**  
    - https://sepolia.etherscan.io/tx/0x19fb927df52c1df71151d4b9f10472af35cff8196d22e812e3f55654bb990f65
    - https://sepolia.etherscan.io/tx/0x0884b7eaff25e94b9e7851c11d13a963dd6a510de2106096f7018db78240febf
    - https://sepolia.etherscan.io/tx/0xa39c9b09282d9105ea60424886298b6508a64fbc1c2043d62bd507fd482ee6c6
    - https://sepolia.etherscan.io/tx/0xa4265fa9a67d7c6fc36ad57ba9a3e3f5e5e14a43d386a0629542eb7220407ac1
    - https://sepolia.etherscan.io/tx/0xc775b3d39afd56a4ae66d4b91cc9b7000b28c1c253159293d5985c0b5d9016bc

- **Delegate Vote:**  
    - https://sepolia.etherscan.io/tx/0x75822b2836507f661d1a21eee7ae0d0a7394377cfbfc1ef70c1c57a59a4fa88a - *Successful*
    - *Failed due to delegatee account do not posses voting rights:*  
        - https://sepolia.etherscan.io/tx/0xc7bbf0eef9e5f432b783d882de240a1cb94143be25df4b0b95a17b6bb593150e
        - https://sepolia.etherscan.io/tx/0x7da446b5e6b9826bada169d4da3ff6cb61d30d31dfeef3cd97412a47297d3cd0


- **Fetch Results:**  
```bash
npx ts-node --files ./scripts/FetchResults.ts <contractAddress>
```

## Contributors

- **Tsar-Odragde** - HSWW8s
- **jjmaloth** - GMm8Id
- **TAUFIQ HIDAYAH** - JH2nHs

## License

This project is open source and available under the [MIT License](LICENSE).