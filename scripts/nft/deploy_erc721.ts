import { ethers, upgrades } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('minter: ', owner.address);

  const HctFactory = await ethers.getContractFactory('HolidayClubTokenV0_2_0');

  const proxy = await upgrades.deployProxy(HctFactory, [], {
    initializer: 'initialize',
  });
  await proxy.deployed();

  const hctAddress = proxy.address;
  const version = await proxy.version();

  console.log('contract address: ', hctAddress);
  console.log('hct version: ', version);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
