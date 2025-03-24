import { createPublicClient, createWalletClient, http, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import MyTokenABI from "../artifacts/contracts/MyToken.sol/MyToken.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    throw new Error("Missing arguments. Usage: npx ts-node --files ./scripts/delegate.ts <token-contract-address> <delegatee-address>");
  }

  const TOKEN_CONTRACT_ADDRESS = args[0];
  const DELEGATEE_ADDRESS = args[1];

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);

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
    address: TOKEN_CONTRACT_ADDRESS as `0x${string}`,
    abi: MyTokenABI.abi,
    client: { public: publicClient, wallet: walletClient },
  });

  console.log(`Delegating voting power to ${DELEGATEE_ADDRESS}...`);

  const delegateTx = await contract.write.delegate([DELEGATEE_ADDRESS]);
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });
  const votesAfter = await contract.read.getVotes([DELEGATEE_ADDRESS]) as bigint;

  console.log(
    `Account ${DELEGATEE_ADDRESS} has ${votesAfter.toString()} units of voting power after delegating\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});