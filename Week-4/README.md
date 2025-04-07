# 🏗️ Week 4 - Building a Full-Stack Voting dApp with Scaffold-ETH 2 & NestJS

## 🚀 Overview
In Week 4, we built a **full-stack voting dApp** that allows users to:
- **Mint voting tokens** using an ERC-20 contract.
- **Self-delegate voting power**.
- **Cast votes** for proposals on-chain.
- **Query election results** to see the winning proposal.

This project integrates:
✅ **Scaffold-ETH 2** as the frontend.  
✅ **NestJS** as the backend API for minting tokens.  
✅ **Viem** for blockchain interactions.  
✅ **MetaMask** for transaction signing.  

---

## 🎯 **Project Goals**
- Implement a **backend API with NestJS** to mint voting tokens.
- Connect **Scaffold-ETH 2 frontend** with smart contracts.
- Use **Viem** to interact with the blockchain.
- Ensure **all write transactions are signed via MetaMask**.
- Query voting results and display them in the UI.

---

## 🛠️ **Implemented Features**
### 🔹 **Backend (NestJS)**
- Built an **API for minting tokens**.
- Used **Viem** to sign transactions.
- Enabled **Swagger UI** for testing endpoints.

### 🔹 **Frontend (Scaffold-ETH 2)**
- Implemented **token minting UI**.
- Integrated **MetaMask** for transaction signing.
- Added **delegation functionality** for voting power.
- Allowed users to **cast votes** for proposals.
- Displayed **winning proposal** using blockchain queries.

---

## 📜 **Smart Contracts Used**
| Contract          | Description |
|------------------|-------------|
| **MyToken.sol** | ERC-20 token with voting power (ERC20Votes) |
| **TokenizedBallot.sol** | Voting contract that tallies votes and selects a winner |

---

## 📡 **Interactions & API**
### 1️⃣ **Minting Tokens**
- **Backend API:** `POST /mint-tokens`
- **Frontend Call:** `mintTokens(address, amount)`

### 2️⃣ **Self-Delegating Voting Power**
- **MetaMask Call:** `delegateVotingPower(tokenAddress)`

### 3️⃣ **Casting a Vote**
- **MetaMask Call:** `castVote(ballotAddress, proposalIndex, amount)`

### 4️⃣ **Querying Voting Results**
- **Frontend Call:** `queryResults(ballotAddress)`

---

## 🖥️ **How to Run Locally**
### 1️⃣ Clone the Repo
```bash
git clone https://github.com/Tsar-Odragde/EVM-Bootcamp-Q1-G7.git
cd EVM-Bootcamp-Q1-G7/Week-4
```

### 2️⃣ Install Dependencies
```bash
yarn install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add:
```env
NEXT_PUBLIC_ALCHEMY_API_KEY=your-alchemy-api-key
PRIVATE_KEY=your-wallet-private-key
TOKEN_ADDRESS=0xYourTokenAddress
BALLOT_ADDRESS=0xYourBallotAddress
```

### 4️⃣ Run the Backend API
```bash
cd token-api
yarn start
```

### 5️⃣ Run the Frontend
```bash
yarn start
```

---

## 📈 **Lessons Learned**
- **Viem** is a powerful alternative to ethers.js for blockchain interactions.
- **MetaMask integration** ensures better security by not exposing private keys.
- **Scaffold-ETH 2** accelerates frontend dApp development.
- **NestJS modular architecture** keeps the backend scalable and maintainable.

## Contributors

    Tsar-Odragde - HSWW8s
    jjmaloth - GMm8Id
    TAUFIQ HIDAYAH - JH2nHs


---

## 🎯 **Final Thoughts**
This project successfully implemented a **decentralized voting system**, allowing users to participate securely. 🚀

🔗 **Check out the full repository:** [EVM Bootcamp Group 7](https://github.com/Tsar-Odragde/EVM-Bootcamp-Q1-G7)

---
