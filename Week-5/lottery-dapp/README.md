# 🎰 Lottery dApp

## Overview
This project is a decentralized Lottery dApp that allows users to

-Purchase and return lottery tokens
-Approve tokens for betting
-Place single or multiple bets
-View lottery status and personal prizes
-Claim winnings
The application is built using

-**Scaffold-ETH 2** for the frontend interface
-**Viem** for blockchain interactions
-**MetaMask** for transaction signing

## Project Goals

-Develop a user-friendly interface for interacting with the Lottery smart contract
-Implement token purchase, return, approval, and betting functionalities
-Enable users to view lottery status and claim prizes
-Ensure secure and efficient blockchain interactions using Viem and MetaMask

## Implemented Features

### Frontend (Scaffold-ETH 2)

- **Token Management**:Users can purchase lottery tokens using ETH and return unused tokens
- **Betting**:Users can place single or multiple bets after approving the required tokens
- **Lottery Status**:Displays current lottery status, including whether bets are open, closing time, and total bets placed
- **Prize Management**:Users can view their winnings and claim prizes directly from the interface

### Blockchain Integration (Viem)

- **Contract Interactions**:Utilizes Viem's `publicClient` to read data from the Lottery smart contract
- **Transaction Signing**:All write transactions are signed through MetaMask, ensuring secure user authentication and authorization

## Setup and Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Tsar-Odragde/EVM-Bootcamp-Q1-G7.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd EVM-Bootcamp-Q1-G7/Week-5
   ```

3. **Install Dependencies**:

   ```bash
   yarn install
   ```

4. **Start the Development Server**:

   ```bash
   yarn start
   ```

   The application will be running at `http://localhost:3000`.

## Usage

- **Connect Wallet**:Use MetaMask to connect your wallet to the application
- **Purchase Tokens**:Enter the amount of ETH to exchange for lottery tokens and confirm the transaction
- **Approve Tokens**:Specify the number of tokens to approve for betting
- **Place Bets**:Choose to place a single bet or multiple bets as desired
- **View Lottery Status**:Check the current status of the lottery, including bet availability and closing time
- **Claim Prizes**:If you have winnings, enter the amount to claim and confirm the transaction

## Notes

-Ensure you are connected to the correct network (e.g., Hardhat local network or Sepolia testnet) when interacting with the dApp
-The Lottery smart contract address is set to `0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512`. Update this address if deploying to a different network
