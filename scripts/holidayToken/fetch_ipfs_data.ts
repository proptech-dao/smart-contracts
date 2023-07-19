import { ethers } from 'hardhat';

async function main() {
  const HctFactory = await ethers.getContractFactory('HolidayClubToken');

  const contract = HctFactory.attach('0x46eD7a1A676BdaD1404E18acc39d1701995EcF6c');
  // TODO: fetch a token ipfs uri and it's contents here:
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
