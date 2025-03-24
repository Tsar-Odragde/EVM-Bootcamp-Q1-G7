# EVM Bootcamp Q1 G7

Welcome to the **EVM Bootcamp Q1 G7** repository. This repository serves to register the weekly projects of **Group 7** for the **Encode Club Solidity Bootcamp**. Each week, participants complete hands-on projects covering different aspects of Ethereum Virtual Machine (EVM) development, from Solidity fundamentals to advanced governance mechanisms.

## Repository Structure

The repository is organized into weekly modules, each focusing on specific aspects of EVM development:

- **Week-1/**: Introduction to Solidity and smart contract development.
- **Week-2/**: Advanced Solidity concepts and smart contract interactions.
- **Week-3/**: Governance mechanisms and token-based voting systems.

Each week's directory contains relevant contracts, scripts, and documentation to facilitate learning and practical implementation.

## Getting Started

To begin working with this repository:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Tsar-Odragde/EVM-Bootcamp-Q1-G7.git
   ```

2. **Navigate to the Desired Week's Directory**:

   ```bash
   cd EVM-Bootcamp-Q1-G7/Week-<number>
   ```

3. **Install Dependencies**:

   Ensure you have [Node.js](https://nodejs.org/) installed. Then, install the necessary packages:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in the week's directory with the following content:

   ```env
   ALCHEMY_API_KEY=your_alchemy_api_key
   PRIVATE_KEY=your_private_key
   ```

   Replace `your_alchemy_api_key` and `your_private_key` with your actual Alchemy API key and Ethereum wallet private key, respectively.

## Weekly Modules Overview

### Week 1: Introduction to Solidity

- **Focus**: Basics of Solidity, smart contract structure, and deployment.
- **Contents**:
  - Simple smart contracts.
  - Deployment scripts.
  - Basic interaction scripts.

### Week 2: Advanced Solidity and Interactions

- **Focus**: Complex Solidity concepts, contract inheritance, and inter-contract communication.
- **Contents**:
  - Advanced smart contracts.
  - Scripts for complex interactions.
  - Unit tests for smart contracts.

### Week 3: Governance and Tokenized Voting

- **Focus**: Implementing governance mechanisms using token-based voting systems.
- **Contents**:
  - **MyToken.sol**: ERC20-based governance token with minting and delegation functionalities.
  - **TokenizedBallot.sol**: Smart contract enabling token-based voting on proposals.
  - Scripts for deploying contracts, minting tokens, delegating voting power, casting votes, checking voting power, and querying voting results.

## Resources

- [Solidity Documentation](https://soliditylang.org/docs/)
- [OpenZeppelin Contracts](https://openzeppelin.com/contracts/)
- [Viem Documentation](https://viem.sh/)

## Contributors

- **Tsar-Odragde** - HSWW8s
- **jjmaloth** - GMm8Id
- **TAUFIQ HIDAYAH** - JH2nHs

## License

This project is open source and available under the [MIT License](LICENSE).