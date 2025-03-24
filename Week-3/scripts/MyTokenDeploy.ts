import { createPublicClient, createWalletClient, http} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import {abi, bytecode} from "../artifacts/contracts/MyToken.sol/MyToken.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
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

  console.log("Deploying MyToken...");

  const hash = await deployer.deployContract({
    abi: abi,
    bytecode: bytecode as `0x${string}`,
    args: [], // Constructor has no arguments
  });

  console.log(`Transaction hash: ${hash}`);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(`MyToken deployed at address: ${receipt.contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// MyToken deployed at address: 0x54dd343df8eff9a651b9da840fd6a81b2de5df2b