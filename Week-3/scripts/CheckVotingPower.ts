import { createPublicClient, http, getContract, formatEther } from "viem";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/MyToken.sol/MyToken.json";
import TokenizedBallot from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json"
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error("Missing Arguments. Usage: npx ts-node --files ./scripts/checkVotingPower.ts <token-contract-address> <ballot-contract-address> <voter-address>");
  }

  const TOKEN_CONTRACT_ADDRESS = args[0];
  const BALLOT_CONTRACT_ADDRESS = args[1]
  const VOTER_ADDRESS = args[2];

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const contract = getContract({
    address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    client: publicClient,
  });

  const ballotContract = getContract({
    address: BALLOT_CONTRACT_ADDRESS as `0x${string}`,
    abi: TokenizedBallot.abi,
    client: publicClient,
  });

  // Check if the voter has self-delegated
  const delegatee = await contract.read.delegates([VOTER_ADDRESS]) as any;
  if (delegatee.toLowerCase() !== VOTER_ADDRESS.toLowerCase()) {
    console.log(`Account ${VOTER_ADDRESS} has not self-delegated and has no voting power.`);
    return;
  }
  
  const votingPower = await ballotContract.read.getRemainingVotingPower([VOTER_ADDRESS]) as bigint;
  console.log(`Account ${VOTER_ADDRESS} has ${formatEther(votingPower).toString()} units of remaining voting power.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});