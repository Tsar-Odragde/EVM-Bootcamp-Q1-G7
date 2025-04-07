import { ethers } from "hardhat";

async function main() {
  const lotteryAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const lottery = await ethers.getContractAt("Lottery", lotteryAddress);

  const closingTime = Math.floor(Date.now() / 1000) + 300; // 5 mins in future

  const tx = await lottery.openBets(closingTime);
  await tx.wait();

  console.log(`✅ Bets opened until: ${new Date(closingTime * 1000).toLocaleString()}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
