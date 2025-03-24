import { createPublicClient, http, getContract } from "viem";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    throw new Error("Usage: ts-node queryResults.ts <ballot-contract-address>");
  }

  const BALLOT_CONTRACT_ADDRESS = args[0];

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const contract = getContract({
    address: BALLOT_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    client: publicClient,
  });

  const winningProposalIndex = await contract.read.winningProposal();
  const winningProposalName = await contract.read.winnerName() as any;
  const winningProposalVotes = await contract.read.proposalVotes([winningProposalIndex]) as any;

  console.log(`Winning proposal index: ${winningProposalIndex}`);
  console.log(`Winning proposal name: ${Buffer.from(winningProposalName).toString().replace(/\0/g, '')}`);
  console.log(`Winning proposal vote count: ${winningProposalVotes.toString()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
