import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('minter: ', owner.address);

  const HctFactory = await ethers.getContractFactory('HolidayClubTokenV0_2_0');

  const contract = HctFactory.attach('0xfC8dbC3FB0201A68d4191DDc7489EB60a8bAfBBF');
  const isApproved = await contract.isApprovedForAll(owner.address, '0xDFfEAf95489774437fcAEDA897f6595Bd49eF859');
  console.log('is approved: ', isApproved);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
