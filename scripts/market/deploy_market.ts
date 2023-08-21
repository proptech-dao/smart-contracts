import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('minter: ', owner.address);

  const MarketFactory = await ethers.getContractFactory('NFTMarketplace');
  const contract = await MarketFactory.deploy();

  await contract.deployed();

  const hctAddress = contract.address;

  console.log('contract address: ', hctAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
