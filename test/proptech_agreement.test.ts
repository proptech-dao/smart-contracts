import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ProptechAgreement } from '../typechain-types';

describe('Proptech agreement', () => {
  let pa: ProptechAgreement;

  it('Should deploy the agreement', async () => {
    const ProptechAgreementFactory = await ethers.getContractFactory('ProptechAgreement');
    pa = await ProptechAgreementFactory.deploy();
  });

  it('it should have minted 1 unit to the deployer of agreement', async () => {
    const [owner] = await ethers.getSigners();
    const balance = await pa.balanceOf(owner.address);
    expect(balance.toString()).to.be.equal('1');
  });
});
