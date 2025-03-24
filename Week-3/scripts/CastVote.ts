import { createPublicClient, createWalletClient, http, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const voterPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    throw new Error("Missing Arguments. Usage: ts-node vote.ts <ballot-contract-address> <proposal-index> <vote-amount>");
  }

  const BALLOT_CONTRACT_ADDRESS = args[0];
  const PROPOSAL_INDEX = parseInt(args[1], 10);
  const VOTE_AMOUNT = BigInt(args[2]);

  const account = privateKeyToAccount(`0x${voterPrivateKey}`);

  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const contract = getContract({
    address: BALLOT_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    client: { public: publicClient, wallet: walletClient },
  });

  const voteTx = await contract.write.vote([PROPOSAL_INDEX, VOTE_AMOUNT]);
  await publicClient.waitForTransactionReceipt({ hash: voteTx });

  console.log(`Successfully voted ${VOTE_AMOUNT.toString()} tokens on proposal ${PROPOSAL_INDEX}`);

  const proposalVotes = await contract.read.proposalVotes([PROPOSAL_INDEX]) as bigint;
  console.log(`Proposal ${PROPOSAL_INDEX} now has ${proposalVotes.toString()} total votes.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});