import { ethers } from "hardhat";

const LOTTERY_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

async function main() {
  const [deployer] = await ethers.getSigners();
  const contract = await ethers.getContractAt("Lottery", LOTTERY_ADDRESS, deployer);

  const tx = await contract.closeLottery();
  console.log("Waiting for transaction confirmation...");
  await tx.wait();

  console.log(`✅ Lottery closed by ${deployer.address}`);
}

main().catch(err => {
  console.error("Error closing the lottery:", err);
  process.exitCode = 1;
});
