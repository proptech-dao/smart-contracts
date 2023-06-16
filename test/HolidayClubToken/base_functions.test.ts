/* eslint-disable camelcase */
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers, upgrades } from 'hardhat';

describe('Holiday club token basic functionality', () => {
  let hctAddress: string;

  it('Should deploy the holiday club token', async () => {
    const HctFactory = await ethers.getContractFactory('HolidayClubToken');

    const proxy = await upgrades.deployProxy(HctFactory, [], {
      initializer: 'initialize',
    });
    await proxy.deployed();

    hctAddress = proxy.address;
    const version = await proxy.version();
    expect(version).to.be.equal('0.1.0');
  });

  it('The holiday club should allow to mint a token', async () => {
    const [main] = await ethers.getSigners();
    const HctFactory = await ethers.getContractFactory('HolidayClubToken');

    const hctContract = HctFactory.attach(hctAddress);
    hctContract.safeMint(main.address, 'tokenUri');
  });
});
