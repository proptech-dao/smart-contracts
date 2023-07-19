/* eslint-disable camelcase */
import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('Holiday club token basic functionality', () => {
  let hctAddress: string;

  it('Should deploy the holiday club token', async () => {
    const HctFactory = await ethers.getContractFactory('HolidayClubTokenV0_2_0');

    const proxy = await upgrades.deployProxy(HctFactory, [], {
      initializer: 'initialize',
    });
    await proxy.deployed();

    hctAddress = proxy.address;
    const version = await proxy.version();
    expect(version).to.be.equal('0.2.0');
  });

  it('The holiday club should allow to mint a token and the minted token should emit an event', async () => {
    const [owner] = await ethers.getSigners();

    const HctFactory = await ethers.getContractFactory('HolidayClubTokenV0_2_0');

    const hctContract = HctFactory.attach(hctAddress);
    const tx = hctContract.safeMint(owner.address, 'tokenUri');
    await expect(tx).to.emit(hctContract, 'Mint').withArgs(owner.address, 0, 'tokenUri');
  });
});
