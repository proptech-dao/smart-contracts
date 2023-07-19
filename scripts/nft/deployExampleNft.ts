import { ethers } from 'hardhat';

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('owner: ', owner.address);

  const NftFactory = await ethers.getContractFactory('NFT');
  const contract = await NftFactory.deploy();
  await contract.deployed();

  const balance = await contract.balanceOf(owner.address);

  console.log('balance: ', balance.toString());

  await contract['safeTransferFrom(address,address,uint256)'](owner.address, '0x08F9E71d658696E4EcEfE8B95f82A09933a05E98', '0');

  console.log('contract address: ', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
