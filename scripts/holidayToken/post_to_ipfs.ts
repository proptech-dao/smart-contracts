import { Web3Storage, getFilesFromPath, File } from 'web3.storage';
import path = require('path');
import nftJsons from '../../assets/hct/many.json';

/**
 *
 * this script uses the assets in the /assets folder in the root of this directory
 * to push data to ipfs through web3.storage
 *
 * After this step, it's possible to push these to an NFT.
 */
async function main() {
  const client = new Web3Storage({ token: String(process.env.WEB3_STORAGE_TOKEN) });

  const relativePath = '../../assets/hct/images';
  const absolutePath = path.join(__dirname, relativePath);
  const files = await getFilesFromPath(absolutePath);

  // put image files in ipfs

  const cid = await client.put(files);
  console.log('stored files with cid:', cid);

  const jsonFiles: File[] = [];

  for (let i = 0; i < 3; i += 1) {
    const buffer = Buffer.from(JSON.stringify({
      name: nftJsons[i].name,
      description: nftJsons[i].description,
      image: `ipfs://${cid}${files[i].name}`,
    }));
    jsonFiles.push(new File([buffer], `${i}.json`));
  }

  const cid2 = await client.put(jsonFiles);
  console.log('stored json files with cid:', cid2);

  return 1;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
