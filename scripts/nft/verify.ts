import { run, upgrades } from 'hardhat';

async function main() {
  const proxy = '0x46eD7a1A676BdaD1404E18acc39d1701995EcF6c';

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(proxy);

  console.log('implementation address: ', implementationAddress);

  await run('verify:verify', {
    address: implementationAddress,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
