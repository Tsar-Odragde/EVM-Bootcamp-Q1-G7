import { createPublicClient, createWalletClient, http, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi, bytecode } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    throw new Error("Missing arguments. Usage: npx ts-node --files ./scripts/TokenizedBallotDeploy.ts <token-address> <proposal1,proposal2,...> <n-blocks-ago>");
  }

  const TOKEN_CONTRACT_ADDRESS = args[0];
  const PROPOSALS = args[1].split(",");
  const blocksAgo = BigInt(args[2]);

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);

  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  console.log("Deployer address:", deployer.account.address);

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const currentBlock = await publicClient.getBlockNumber();
  const targetBlockNumber = currentBlock - blocksAgo;

  const proposalsBytes32 = PROPOSALS.map((prop) => toHex(prop, { size: 32 }));

  console.log("Deploying TokenizedBallot...");

  const hash = await deployer.deployContract({
    abi: abi,
    bytecode: bytecode as `0x${string}`,
    args: [proposalsBytes32, TOKEN_CONTRACT_ADDRESS, targetBlockNumber],
  });

  console.log(`Transaction hash: ${hash}`);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(`TokenizedBallot deployed at address: ${receipt.contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
