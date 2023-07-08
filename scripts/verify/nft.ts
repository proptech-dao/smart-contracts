import { run } from 'hardhat';

async function main() {
  const address = '0x09bAc812BeD0AcB6f19766037578EbC78391e379';

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
