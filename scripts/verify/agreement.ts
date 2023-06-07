import { run } from 'hardhat';

async function main() {
  const address = '0x493f2ACFeA42aD4dfc7477fA6c7B806004c3FFE5';

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
