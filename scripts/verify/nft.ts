import { run } from 'hardhat';

async function main() {
  const address = '0x6936C31a39DA342F925E78c30bA9686c43F46C3a';

  await run('verify:verify', {
    address,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
