import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployLottery: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // Customize these values as needed
  const tokenName = "LotteryToken";
  const tokenSymbol = "LTK";
  const purchaseRatio = 1000; // 1 ETH = 100 LTK
  const betPrice = 10;
  const betFee = 1;

  await deploy("Lottery", {
    from: deployer,
    args: [tokenName, tokenSymbol, purchaseRatio, betPrice, betFee],
    log: true,
  });
};

export default deployLottery;
deployLottery.tags = ["Lottery"];
