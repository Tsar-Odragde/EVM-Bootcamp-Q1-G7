# EVM Bootcamp Q1 - Week 3 Group Project

This repository contains the deliverable for a group activity as part of the EVM Bootcamp Week3 Homework. The project focuses on developing scripts to interact with the provided Solidity smart contract Tokenized-Ballot.sol.

Develop and run scripts for “TokenizedBallot.sol” within our group to give voting tokens, delegating voting power, casting votes, checking vote power and querying results
    Develop and execute scripts for Tokenized-Ballot.sol to perform:
        Granting voting rights
        Casting votes
        Delegating votes
        Querying voting results

    Document each function execution clearly, noting:
        Transaction hashes for successful operations
        Revert reasons for any failed transactions

    Submit the final report through the provided form in Discord.

    Ensure the code is uploaded to a GitHub repository and linked appropriately.

    
    Install dependencies:

npm install

    Configure Environment Variables:

Create a .env file in the Week-2 directory containing:

ALCHEMY_API_KEY=your_alchemy_api_key
PRIVATE_KEY=your_wallet_private_key

Using the Scripts
Deploy Ballot Contract

Deploy your contract with specified proposal names:

npx hardhatrun scripts/TestVoteToken.ts



Technologies Used

    Solidity - Smart contract programming language
    TypeScript - Scripting for smart contract interaction
    Viem - Ethereum client library for script execution
    Hardhat - Ethereum development environment for smart contracts
    Alchemy - RPC API for Ethereum blockchain data

Reporting & Submission
Minting Tokens:
Transaction Hash: 0xf82ae5f91e85d420ccef148f964695e4819032df83d6d1a3109afacb487b3287
Block Number: 2
Gas Used: 122,480
Status: Success
Delegating Voting Power:
Transaction Hash: 0x9bb649519700e3cb3005995e3ac5585a0ca420df8f8a1176ac40708f103df79a
Block Number: 3
Gas Used: 96,881
Status: Success
Checking Vote Power:
Initial voting power: 0
After delegation: 1,000,000,000,000,000,000,000 (1000 tokens)
Historical Voting Power:
Block 2: 0 votes
Block 1: 0 votes
    
Contributors

    Tsar-Odragde - HSWW8s
    jjmaloth - GMm8Id
    TAUFIQ HIDAYAH - JH2nHs

License
This project is open source and available under the MIT License.
