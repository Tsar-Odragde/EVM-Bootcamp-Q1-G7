import { createPublicClient, createWalletClient, http, getContract } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import { abi } from "../artifacts/contracts/TokenizedBallot.sol/TokenizedBallot.json";
import * as dotenv from "dotenv";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    throw new Error("Missing arguments. Usage: npx ts-node --files ./scripts/delegate.ts <ballot-contract-address> <delegator-address> <delegatee-address>");
  }

  const BALLOT_CONTRACT_ADDRESS = args[0];
  const DELEGATOR_ADDRESS = args[1];
  const DELEGATEE_ADDRESS = args[2];

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
    address: BALLOT_CONTRACT_ADDRESS as `0x${string}`,
    abi: abi,
    client: { public: publicClient, wallet: deployer },
  });

  const delegateTx = await contract.write.delegate([DELEGATEE_ADDRESS]);
  await publicClient.waitForTransactionReceipt({ hash: delegateTx });

  console.log(`Delegator ${DELEGATOR_ADDRESS} delegated votes to ${DELEGATEE_ADDRESS}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
