"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useState, useEffect } from "react";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { writeContract } from "@wagmi/core";
import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";

import lotteryAbi from "../../hardhat/artifacts/contracts/Lottery.sol//Lottery.json";
import tokenAbi from "../../hardhat/artifacts/contracts/LotteryToken.sol/LotteryToken.json";

const LOTTERY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http("http://localhost:8545"),
});

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const [ethAmount, setEthAmount] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [approveAmount, setApproveAmount] = useState("");
  const [claimAmount, setClaimAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState<Address | null>(null);
  const [prizeAmount, setPrizeAmount] = useState<bigint | null>(null);

  const [betsOpen, setBetsOpen] = useState(false);
  const [closingTime, setClosingTime] = useState<bigint | null>(null);
  const [prizePool, setPrizePool] = useState<bigint | null>(null);
  const [betPrice, setBetPrice] = useState<bigint | null>(null);

  const { writeContractAsync, isLoading } = useScaffoldWriteContract({
    contractName: "Lottery",
  });  

  useEffect(() => {
    const fetchTokenAddress = async () => {
      try {
        const address = await publicClient.readContract({
          address: LOTTERY_ADDRESS as `0x${string}`,
          abi: lotteryAbi.abi,
          functionName: "paymentToken",
        });
        console.log("Fetched token address:", address);
        setTokenAddress(address as string);
      } catch (err) {
        console.error("Failed to get token address", err);
      }
    };
    fetchTokenAddress();
  }, []);

  useEffect(() => {
    const fetchPrizeAmount = async () => {
      if (!connectedAddress) return;
      try {
        const amount = await publicClient.readContract({
          address: LOTTERY_ADDRESS,
          abi: lotteryAbi.abi,
          functionName: "prize",
          args: [connectedAddress],
        });
        setPrizeAmount(amount as bigint);
      } catch (err) {
        console.error("Failed to fetch prize amount:", err);
      }
    };

    fetchPrizeAmount();
  }, [connectedAddress]);

  const handleApprove = async () => {
    if (!tokenAddress) {
      alert("Token address not loaded yet.");
      return;
    }

    try {
      const tx = await writeContractAsync({
        address: tokenAddress,
        abi: tokenAbi.abi,
        functionName: "approve",
        args: [LOTTERY_ADDRESS, BigInt(approveAmount)],
      });
      console.log("Approve TX:", tx);
      alert("Approval successful!");
    } catch (e) {
      console.error("Error approving tokens:", e);
      alert("Approval failed.");
    }
  };

  const handlePurchase = async () => {
    try {
      const tx = await writeContractAsync({
        functionName: "purchaseTokens",
        value: parseEther(ethAmount),
      });      
      console.log("TX:", tx);
      alert("Tokens purchased successfully!");
    } catch (err) {
      console.error("Error purchasing tokens:", err);
      alert("Transaction failed");
    }
  };

  const handleReturn = async () => {
    try {
      const tx = await writeContractAsync({
        functionName: "returnTokens",
        args: [BigInt(returnAmount)],
      });
      console.log("Return TX:", tx);
      alert("Tokens returned successfully!");
    } catch (err) {
      console.error("Error returning tokens:", err);
      alert("Return transaction failed.");
    }
  };

  const handleClaimPrize = async () => {
    try {
      const tx = await writeContractAsync({
        functionName: "prizeWithdraw",
        args: [BigInt(claimAmount)],
      });
      console.log("Claim Prize TX:", tx);
      alert("Prize claimed successfully!");
    } catch (err) {
      console.error("Error claiming prize:", err);
      alert("Claim failed.");
    }
  };

  useEffect(() => {
    const fetchLotteryInfo = async () => {
      try {
        const contractAddress = LOTTERY_ADDRESS;

        const [isOpen, closing, prize, price] = await Promise.all([
          publicClient.readContract({
            address: contractAddress,
            abi: lotteryAbi.abi,
            functionName: "betsOpen",
          }),
          publicClient.readContract({
            address: contractAddress,
            abi: lotteryAbi.abi,
            functionName: "betsClosingTime",
          }),
          publicClient.readContract({
            address: contractAddress,
            abi: lotteryAbi.abi,
            functionName: "prizePool",
          }),
          publicClient.readContract({
            address: contractAddress,
            abi: lotteryAbi.abi,
            functionName: "betPrice",
          }),
        ]);

        setBetsOpen(isOpen as boolean);
        setClosingTime(closing as bigint);
        setPrizePool(prize as bigint);
        setBetPrice(price as bigint);
      } catch (err) {
        console.error("Error reading lottery data:", err);
      }
    };

    fetchLotteryInfo();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">🎰 Lottery dApp</h1>
      <Address address={connectedAddress} />

      {tokenAddress && (
        <p className="text-xs text-gray-500 mt-2">
          Token Address: <code>{tokenAddress}</code>
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">🎟️ Buy Tokens</h2>
          <input
            type="number"
            step="0.01"
            placeholder="ETH Amount"
            className="input input-bordered w-full mb-2"
            value={ethAmount}
            onChange={e => setEthAmount(e.target.value)}
          />
          <button className="btn btn-primary w-full" onClick={handlePurchase} disabled={isLoading}>
            {isLoading ? "Purchasing..." : "Buy Tokens"}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">🔁 Return Tokens</h2>
          <input
            type="number"
            step="1"
            placeholder="Token Amount"
            className="input input-bordered w-full mb-2"
            value={returnAmount}
            onChange={e => setReturnAmount(e.target.value)}
          />
          <button className="btn btn-secondary w-full" onClick={handleReturn} disabled={isLoading}>
            {isLoading ? "Returning..." : "Return Tokens"}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">✅ Approve Tokens</h2>
          <input
            type="number"
            step="1"
            placeholder="Amount to Approve"
            className="input input-bordered w-full mb-2"
            value={approveAmount}
            onChange={e => setApproveAmount(e.target.value)}
          />
          <button className="btn btn-accent w-full" onClick={handleApprove} disabled={isLoading}>
            {isLoading ? "Approving..." : "Approve"}
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">💰 Claim Prizes</h2>
          {prizeAmount !== null && (
            <p className="text-sm mb-2">You have {Number(prizeAmount)} tokens to claim.</p>
          )}
          <input
            type="number"
            step="1"
            placeholder="Amount to Claim"
            className="input input-bordered w-full mb-2"
            value={claimAmount}
            onChange={e => setClaimAmount(e.target.value)}
          />
          <button className="btn btn-success w-full" onClick={handleClaimPrize} disabled={isLoading}>
            {isLoading ? "Claiming..." : "Claim Prize"}
          </button>
        </div>
      </div>
      <div className="mt-10 bg-base-200 p-6 rounded-xl">
        <h2 className="text-2xl font-semibold mb-4">📊 Lottery Status</h2>
        <p><strong>Status:</strong> {betsOpen ? "🟢 Open" : "🔴 Closed"}</p>
        {closingTime && (
          <p><strong>Closes At:</strong> {new Date(Number(closingTime) * 1000).toLocaleString()}</p>
        )}
        {prizePool && betPrice && (
          <p><strong>Total Bets:</strong> {Number(prizePool) / Number(betPrice)}</p>
        )}
      </div>
    </div>
  );
};

export default Home;
