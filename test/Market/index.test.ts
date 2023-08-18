import { ethers } from 'hardhat';
import { expect } from 'chai';
import { Contract } from 'ethers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('NFTMarketplace', () => {
  let NFTMarketplace: Contract;
  let HolidayClubToken: Contract;
  let MockERC20: Contract;
  let buyer: SignerWithAddress;
  let seller: SignerWithAddress;
  const tokenId = 0;

  it('should deploy all the contracts', (async () => {
    // Get signers
    [, buyer, seller] = await ethers.getSigners();

    // Deploy MockERC20 token
    const ERC20 = await ethers.getContractFactory('MockERC20');
    MockERC20 = await ERC20.deploy();
    await MockERC20.deployed();

    // Deploy HolidayClubTokenV0_2_0 NFT
    const NFT = await ethers.getContractFactory('HolidayClubTokenV0_2_0');
    HolidayClubToken = await NFT.deploy();
    await HolidayClubToken.deployed();

    // Mint NFT to seller
    await HolidayClubToken.connect(seller).safeMint(seller.address, 'tokenUri');

    // Deploy NFTMarketplace
    const Marketplace = await ethers.getContractFactory('NFTMarketplace');
    NFTMarketplace = await Marketplace.deploy();
    await NFTMarketplace.deployed();
  }));

  it('Should allow a user to list their NFT for a specified ERC20 token price', async () => {
    const price = ethers.utils.parseUnits('1', 'ether');

    await HolidayClubToken.connect(seller).approve(NFTMarketplace.address, tokenId);

    await NFTMarketplace.connect(seller)
      .listNFT(HolidayClubToken.address, tokenId, price, MockERC20.address);

    const offer = await NFTMarketplace.offers(HolidayClubToken.address, tokenId);
    expect(offer.isForSale).to.equal(true);
    expect(offer.seller).to.equal(seller.address);
    expect(offer.price.toString()).to.equal(price.toString());
    expect(offer.paymentToken).to.equal(MockERC20.address);
  });

  it('Should allow a user to buy a listed NFT using the specified ERC20 token', async () => {
    const price = ethers.utils.parseUnits('1', 'ether');

    // Buyer buys MockERC20 token
    await MockERC20.mint(buyer.address, price);

    // Approve transfer from buyer to NFTMarketplace
    await MockERC20.connect(buyer).approve(NFTMarketplace.address, price);

    await NFTMarketplace.connect(buyer).buyNFT(HolidayClubToken.address, tokenId);

    const newOwner = await HolidayClubToken.ownerOf(tokenId);
    expect(newOwner).to.equal(buyer.address);
  });
});
