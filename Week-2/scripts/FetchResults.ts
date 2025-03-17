import { createPublicClient, http, hexToString } from "viem";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";

// Expected CLI parameters: node script.ts <contractAddress>
// Example usage: node script.ts 0xYourContractAddress
const parameters = process.argv.slice(2);
if (!parameters || parameters.length < 1)
  throw new Error("Contract address parameter not provided");

const ballotAddress = parameters[0] as `0x${string}`;
if (!/^0x[a-fA-F0-9]{40}$/.test(ballotAddress))
  throw new Error("Invalid contract address provided");

async function main() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const winningProposalIndex = await publicClient.readContract({
    address: ballotAddress,
    abi,
    functionName: "winningProposal",
  }) as bigint;

  const winnerNameBytes = await publicClient.readContract({
    address: ballotAddress,
    abi,
    functionName: "winnerName",
  }) as `0x${string}`;

  const winnerProposal = await publicClient.readContract({
    address: ballotAddress,
    abi,
    functionName: "proposals",
    args: [winningProposalIndex],
  }) as [string, bigint];

  console.log("Winning Proposal Index:", winningProposalIndex.toString());
  console.log("Winner Name:", hexToString(winnerNameBytes, { size: 32 }));
  console.log("Winner Vote Count:", winnerProposal[1].toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
