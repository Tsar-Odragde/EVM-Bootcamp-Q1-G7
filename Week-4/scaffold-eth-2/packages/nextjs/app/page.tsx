"use client";

import { useState } from "react";
import { NextPage } from "next";
//import Link from "next/link";
import { castVote, delegateVotingPower, mintTokens, queryResults } from "../utils/api";

const tokenAddress = "0x54dd343df8eff9a651b9da840fd6a81b2de5df2b"; // Replace with actual address
const ballotAddress = "0x7a880b0ea32d92f5fceecc95bc13caf63cf8e097"; // Replace with actual address

const HomePage: NextPage = () => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const [proposalIndex, setProposalIndex] = useState("");
  const [voteAmount, setVoteAmount] = useState("");
  const [voteTxHash, setVoteTxHash] = useState("");

  const [winningProposal, setWinningProposal] = useState("");
  const [winnerName, setWinnerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMint = async () => {
    setIsLoading(true);

    const result = await mintTokens(recipient, amount);
    
    // Ensure we store only the transaction hash as a string
    if (result && typeof result === "object" && "result" in result) {
      setTxHash(result.result); // Extract transaction hash
    } else {
      console.error("Invalid response from API:", result);
    }
    setIsLoading(false);
  };

  const handleDelegate = async () => {
    console.log("Delegating using token address:", tokenAddress);

    if (!tokenAddress || typeof tokenAddress !== "string" || !tokenAddress.startsWith("0x") || tokenAddress.length !== 42) {
      alert("Invalid token address!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await delegateVotingPower(tokenAddress);
      if (result) {
        alert("Successfully self-delegated! Tx Hash: " + result);
      } else {
        alert("Delegation failed. Check the console for errors.");
      }
    } catch (error) {
      console.error("Delegation error:", error);
      alert("Failed to delegate voting power!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async () => {
    console.log("Voting using ballot address:", ballotAddress);

    if (!ballotAddress || typeof ballotAddress !== "string" || !ballotAddress.startsWith("0x") || ballotAddress.length !== 42) {
      alert("Invalid ballot address!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await castVote(ballotAddress, Number(proposalIndex), voteAmount);
      if (result) {
        setVoteTxHash(result);
        alert("Successfully voted! Tx Hash: " + result);
      } else {
        alert("Voting failed. Check the console for errors.");
      }
    } catch (error) {
      console.error("Voting error:", error);
      alert("Failed to cast vote!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQueryResults = async () => {
    console.log("Querying results using ballot address:", ballotAddress);

    if (!ballotAddress || typeof ballotAddress !== "string" || !ballotAddress.startsWith("0x") || ballotAddress.length !== 42) {
      alert("Invalid ballot address!");
      return;
    }

    setIsLoading(true);
    try {
      const result = await queryResults(ballotAddress);
      if (result) {
        setWinningProposal(result.winningProposalIndex.toString());
        setWinnerName(result.winnerName);
      } else {
        alert("Failed to fetch voting results. Check the console for errors.");
      }
    } catch (error) {
      console.error("Error fetching results:", error);
      alert("Failed to fetch voting results.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Voting dApp</h1>

      {/* Navigation Links
      <div className="flex space-x-4 mb-4">
        <Link href="/nextpage">
          <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700">
            Go to Next Page
          </button>
        </Link>
      </div> */}

      {/* Minting Section */}
      <h2 className="text-2xl font-bold mb-4">Mint Voting Tokens</h2>

      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />

      <button
        onClick={handleMint}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Mint
      </button>

      {txHash && (
        <div className="mt-4 p-3 bg-green-200 border border-green-600 rounded">
          <p>Transaction Hash:</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            {txHash}
          </a>
        </div>
      )}

      {/* Self-Delegation Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Self-Delegate Voting Power</h2>
      <button
        onClick={handleDelegate}
        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
      >
        Self-Delegate
      </button>

      {/* Voting Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Cast Your Vote</h2>
      <input
        type="number"
        placeholder="Proposal Index"
        value={proposalIndex}
        onChange={(e) => setProposalIndex(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />
      <input
        type="number"
        placeholder="Amount"
        value={voteAmount}
        onChange={(e) => setVoteAmount(e.target.value)}
        className="mb-2 p-2 border rounded w-80"
      />
      <button
        onClick={handleVote}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Vote
      </button>
      {voteTxHash && (
        <div className="mt-4 p-3 bg-green-200 border border-green-600 rounded">
          <p>Transaction Hash:</p>
          <a
            href={`https://sepolia.etherscan.io/tx/${voteTxHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline"
          >
            {voteTxHash}
          </a>
        </div>
      )}

      {/* Voting Results Section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Voting Results</h2>
      <button
        onClick={handleQueryResults}
        className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        disabled={isLoading}
      >
        {isLoading ? "Fetching Results..." : "Get Voting Results"}
      </button>

      {winningProposal && (
        <div className="mt-4 p-3 bg-blue-200 border border-blue-600 rounded">
          <p className="text-lg font-semibold">Winning Proposal:</p>
          <p className="text-xl font-bold">{winnerName} (Index: {winningProposal})</p>
        </div>
      )}
      
    </div>
  );
};

export default HomePage;