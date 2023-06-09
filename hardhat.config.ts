import * as dotenv from 'dotenv';
import '@openzeppelin/hardhat-upgrades';

import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

dotenv.config();

const {
  PRIVATE_KEY, SCAN_KEY, MUMBAI_RPC_URL, POLYGON_RPC_URL,
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.18',
      },
      {
        version: '0.8.17',
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
    polygon: {
      url: String(POLYGON_RPC_URL),
      accounts: [String(PRIVATE_KEY)],
      allowUnlimitedContractSize: true,
    },
    mumbai: {
      url: String(MUMBAI_RPC_URL),
      accounts: [String(PRIVATE_KEY)],
      allowUnlimitedContractSize: true,
    },
  },
  etherscan: {
    apiKey: String(SCAN_KEY),
  },
  typechain: {
    outDir: 'typechain-types',
    target: 'ethers-v5',
    // should overloads with full signatures like deposit(uint256) be generated always,
    // even if there are no overloads?
    alwaysGenerateOverloads: true,
  },
};

export default config;
