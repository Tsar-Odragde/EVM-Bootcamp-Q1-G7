import { http, parseUnits, encodeFunctionData, createPublicClient, hexToString } from "viem";
import { sepolia } from "viem/chains";
import tokenABI from "../../hardhat/artifacts/contracts/MyToken.sol/MyToken.json";
import ballotABI from "../../hardhat/artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";

const RPC_URL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`;

export const API_URL = "http://localhost:3001";

export const mintTokens = async (address: string, amount: string) => {
  try {
    const response = await fetch(`${API_URL}/mint-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address, amount }),
    });

    const data = await response.json();
    return data; // Should return transaction hash
  } catch (error) {
    console.error("Error minting tokens:", error);
    return null;
  }
};

export const delegateVotingPower = async (tokenAddress: string) => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask (or another Web3 wallet) is not installed");
      }
  
      // ✅ Ensure `tokenAddress` is a valid string
      if (typeof tokenAddress !== "string" || !tokenAddress.startsWith("0x") || tokenAddress.length !== 42) {
        throw new Error(`Invalid token contract address: ${tokenAddress}`);
      }
  
      // ✅ Request connected accounts from MetaMask
      const [userAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });
  
      // ✅ Encode function data for "delegate(address)"
      const data = encodeFunctionData({
        abi: tokenABI.abi,
        functionName: "delegate",
        args: [userAddress],
      });
  
      // ✅ Ask MetaMask to sign & send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: userAddress,
            to: tokenAddress,
            data,
          },
        ],
      });
  
      console.log("Delegation Transaction Hash:", txHash);
      return txHash;
    } catch (error) {
      console.error("Error delegating voting power:", error);
      return null;
    }
  };

  export const castVote = async (ballotAddress: string, proposalIndex: number, amount: string) => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed");
      }
  
      // ✅ Ensure ballotAddress is a valid Ethereum address
      if (typeof ballotAddress !== "string" || !ballotAddress.startsWith("0x") || ballotAddress.length !== 42) {
        throw new Error(`Invalid ballot contract address: ${ballotAddress}`);
      }
  
      // ✅ Request connected accounts from MetaMask
      const [userAddress] = await window.ethereum.request({ method: "eth_requestAccounts" });
  
      // ✅ Encode function data for "vote(uint256,uint256)"
      const data = encodeFunctionData({
        abi: ballotABI.abi,
        functionName: "vote",
        args: [proposalIndex, parseUnits(amount, 18)],
      });
  
      // ✅ Ask MetaMask to sign & send transaction
      const txHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: userAddress,
            to: ballotAddress,
            data,
          },
        ],
      });
  
      console.log("Vote Transaction Hash:", txHash);
      return txHash;
    } catch (error) {
      console.error("Error casting vote:", error);
      return null;
    }
  };

  export const queryResults = async (ballotAddress: string) => {
    try {
      if (!ballotAddress || typeof ballotAddress !== "string" || !ballotAddress.startsWith("0x") || ballotAddress.length !== 42) {
        throw new Error(`Invalid ballot contract address: ${ballotAddress}`);
      }
  
      // ✅ Create a public client to read from the blockchain
      const publicClient = createPublicClient({
        chain: sepolia,
        transport: http(RPC_URL),
      });
  
      // ✅ Fetch the winning proposal index
      const winningProposalIndex = await publicClient.readContract({
        address: ballotAddress as `0x${string}`,
        abi: ballotABI.abi,
        functionName: "winningProposal",
      }) as `0x${string}`;
  
      // ✅ Fetch the name of the winning proposal
      const winnerNameBytes32 = await publicClient.readContract({
        address: ballotAddress as `0x${string}`,
        abi: ballotABI.abi,
        functionName: "winnerName",
      }) as `0x${string}`;
  
      const winnerName = hexToString(winnerNameBytes32, {size: 32});

      console.log(`Winning Proposal: ${winningProposalIndex} (${winnerName})`);
      return { winningProposalIndex, winnerName };
    } catch (error) {
      console.error("Error querying voting results:", error);
      return null;
    }
  };
