import { createPublicClient, http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import * as dotenv from "dotenv";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

const COMMANDS = ["giveRightToVote", "delegate"];

// Expected CLI parameters: node script.ts <contractAddress> <voterAddress> <command>
// Example usage: node script.ts 0xYourContractAddress 0xVoterAddress giveRightToVote
const parameters = process.argv.slice(2);
if (!parameters || parameters.length < 3)
  throw new Error("Parameters (contractAddress, voterAddress, command) not provided");

const contractAddress = parameters[0] as `0x${string}`;
if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
  throw new Error("Invalid contract address provided");

const voterAddress = parameters[1] as `0x${string}`;
if (!/^0x[a-fA-F0-9]{40}$/.test(voterAddress))
  throw new Error("Invalid voter address provided");

const command = parameters[2].trim();
if (!COMMANDS.includes(command))
  throw new Error(`Invalid command: '${command}'.`);

async function main() {
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

  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: command,
    args: [voterAddress],
  });

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log("Transaction confirmed.");
  console.log(`Receipt status: ${receipt.status}`);
  console.log(`Gas used: ${receipt.gasUsed}`);
  console.log(`Block number: ${receipt.blockNumber}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
