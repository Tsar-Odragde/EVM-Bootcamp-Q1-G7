import { createPublicClient, createWalletClient, getContract, http, parseUnits, formatEther } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import {abi} from "../artifacts/contracts/MyToken.sol/MyToken.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    throw new Error("Missing arguments. Usage: npx ts-node --files ./scripts/Mint.ts <token-address> <recipient-address> <amount>");
  }

  const TOKEN_CONTRACT_ADDRESS = args[0];
  const RECIPIENT_ADDRESS = args[1];
  const AMOUNT = args[2];

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);

  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const contract = getContract({
    address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    client: { public: publicClient, wallet: deployer },
  });

  const mintTx = await contract.write.mint([RECIPIENT_ADDRESS, parseUnits(AMOUNT, 18)]);
  await publicClient.waitForTransactionReceipt({ hash: mintTx });

  console.log(`Minted ${AMOUNT} tokens to account ${RECIPIENT_ADDRESS}`);

  const balance = await contract.read.balanceOf([RECIPIENT_ADDRESS]) as any;
  console.log(`Account ${RECIPIENT_ADDRESS} has ${formatEther(balance).toString()} units of MyToken`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});