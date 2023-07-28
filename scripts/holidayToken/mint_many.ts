import { ethers } from 'hardhat';

/**
 *
 * Uses the minted ipfs cid's from "post_to_ipfs.ts" script
 * to mint these nfts
 */

function generateStrings(baseString:string, numberOfStrings: number) {
  const generatedStrings = [];
  for (let i = 0; i < numberOfStrings; i += 1) {
    generatedStrings.push(`${baseString}/${i}.json`);
  }
  return generatedStrings;
}

async function main() {
  const [owner] = await ethers.getSigners();

  console.log(owner.address);

  const HCT = await ethers.getContractFactory('HolidayClubTokenV0_2_0');
  const contract = HCT.attach('0xFb196E0580317100EaE8b08cFE3A6500a2039358');

  const uri = 'ipfs://bafybeidss635nuogqhojzkodd3rlp2pax36urhdxyhm5pecelkqjbub2ve';
  const uris = generateStrings(uri, 3);

  // let nonce = await owner.getTransactionCount();
  uris.map(async (cid: string) => {
    nonce += 1;
    const tx = await contract.connect(owner).safeMint(owner.address, cid);
    const receipt = await tx.wait();
    console.log(receipt);
  });

  return 1;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
