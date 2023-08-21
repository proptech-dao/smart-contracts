import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(owner.address);

  const MockFactory = await ethers.getContractFactory('MockERC20');
  const contract = await MockFactory.deploy();

  await contract.deployed();

  const mockERC20 = contract.address;

  console.log('mockERC20 contract address: ', mockERC20);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
