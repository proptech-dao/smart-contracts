import { run } from 'hardhat';

async function main() {
  const address = '0xd27aCb384fA34E51c00B55812ACaFA388F027F38';

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
