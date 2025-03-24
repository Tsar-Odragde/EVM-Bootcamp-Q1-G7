import { createPublicClient, http, getContract, formatEther, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import MyToken from "../artifacts/contracts/MyToken.sol/MyToken.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    throw new Error("Missing Arguments. Usage: npx ts-node --files ./scripts/checkVotingPower.ts <ballot-contract-address> <voter-address>");
  }

  const BALLOT_CONTRACT_ADDRESS = args[0];
  const TOKEN_CONTRACT_ADDRESS = args[1];
  const VOTER_ADDRESS = args[2];

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const contract = getContract({
    address: BALLOT_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    client: publicClient,
  });

  const contractToken = getContract({
    address:TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    abi: MyToken.abi,
    client: publicClient,
  });

  const delegateTx = await contractToken.write.delegate([walletClient.account.address], {
    account: walletClient.account,
  });
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });

  const getVotesTx = await contractToken.read.getVotes([VOTER_ADDRESS])

  const votingPower = await contract.read.getRemainingVotingPower([VOTER_ADDRESS]) as bigint;
  console.log(`Account ${VOTER_ADDRESS} has ${formatEther(votingPower).toString()} units of remaining voting power.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});