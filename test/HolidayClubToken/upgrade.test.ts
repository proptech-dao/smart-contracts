/* eslint-disable camelcase */
import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('Upgrade Holiday Token', () => {
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

  it('it should allow it to upgrade', async () => {
    const HctFactoryV0_2_0 = await ethers.getContractFactory('HolidayClubTokenV0_2_0');
    const upgraded = await upgrades.upgradeProxy(hctAddress, HctFactoryV0_2_0);
    hctAddress = upgraded.address;
  });

  it('should get the new version from the proxy', async () => {
    const HctFactoryV0_2_0 = await ethers.getContractFactory('HolidayClubTokenV0_2_0');
    const hctInstance = HctFactoryV0_2_0.attach(hctAddress);
    const version = await hctInstance.version();
    expect(version).to.be.equal('0.2.0');
  });
});
