import { ethers } from 'hardhat';
import { PolygonGasCalculatorService } from '../utils/gasCalculator';

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('deploying from: ', owner.address);

  const ProptechAgreementFactory = await ethers.getContractFactory('ProptechAgreement');

  const { maxFeePerGas, maxPriorityFeePerGas } = await new PolygonGasCalculatorService().calcGas();
  const pa = await ProptechAgreementFactory.deploy({ maxFeePerGas, maxPriorityFeePerGas });

  await pa.deployed();

  console.log('Agreement address: ', pa.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
