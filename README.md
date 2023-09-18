# ProptechDAO smart contracts

This repo contains all smart contract related to our projects and governance



# Holiday Token 

The current address being used in mumbai for the NFT is `0xfC8dbC3FB0201A68d4191DDc7489EB60a8bAfBBF`.

The current address being used in mumbai for the Market is: `0x71e10316F9a811474a32Df9aa65F4Ab204b3571A`

Also, a mock of ERC20 address was deployed here: `0xBacfA80CEb9696173Cdc6f7470768a5E73f409ef`

When changing any of these addresses, don't forge to change the subgraph indexing.

We have scripts for minting and for deploying to IPFS using web3.storage.

# Contract verification

It's easier to verify with:
```
npx hardhat verify 0xfC8dbC3FB0201A68d4191DDc7489EB60a8bAfBBF  --network mumbai
```

run scripts doesn't seem to be working properly.