import { run } from 'hardhat';

async function main() {
  const address = '0x14bc6BC2baabd9F224fbE43f968825bab64aE6b5';

  await run('verify:verify', {
    address,
    constructorArguments: [

    ],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
