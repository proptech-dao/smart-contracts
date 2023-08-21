/* eslint-disable no-await-in-loop */
import { ethers } from 'hardhat';

/**
 * this code is a demonstration on how to list NFTs in the marketplace
 */

async function main() {
  const [owner] = await ethers.getSigners();
  console.log('owner: ', owner.address);

  const HCT = await ethers.getContractFactory('HolidayClubTokenV0_2_0');
  const hct = HCT.attach('0xfC8dbC3FB0201A68d4191DDc7489EB60a8bAfBBF');

  const market = await ethers.getContractFactory('NFTMarketplace');
  const contract = market.attach('0x13B2b608ad59DA0fA1DdfFc6689bEe265E916Fa8');

  await contract.listNFT(hct.address, '0', ethers.utils.parseEther('100'), '0xBacfA80CEb9696173Cdc6f7470768a5E73f409ef');

  return 1;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
