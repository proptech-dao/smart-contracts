// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTMarketplace {
    struct Offer {
        address payable seller;
        uint256 tokenId;
        uint256 price;
        address nftAddress;
        address paymentToken; // ERC20 token used for payment
        bool isForSale;
    }

    mapping(address => mapping(uint256 => Offer)) public offers;

    event NFTListed(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price,
        address paymentToken
    );
    event NFTUnlisted(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId
    );
    event NFTPurchased(
        address indexed seller,
        address indexed nftAddress,
        uint256 indexed tokenId,
        address buyer,
        uint256 price
    );

    function listNFT(
        address nftAddress,
        uint256 tokenId,
        uint256 price,
        address paymentToken
    ) external {
        IERC721Upgradeable nftToken = IERC721Upgradeable(nftAddress);

        require(nftToken.ownerOf(tokenId) == msg.sender, "Not owner");
        require(price > 0, "Price should be greater than 0");

        offers[nftAddress][tokenId] = Offer({
            seller: payable(msg.sender),
            tokenId: tokenId,
            price: price,
            nftAddress: nftAddress,
            paymentToken: paymentToken,
            isForSale: true
        });

        IERC721Upgradeable(nftAddress).transferFrom(
            msg.sender,
            address(this),
            tokenId
        );

        emit NFTListed(msg.sender, nftAddress, tokenId, price, paymentToken);
    }

    function unlistNFT(address nftAddress, uint256 tokenId) external {
        Offer memory offer = offers[nftAddress][tokenId];
        require(msg.sender == offer.seller, "Not owner");

        offer.isForSale = false;
        offers[nftAddress][tokenId] = offer;

        emit NFTUnlisted(msg.sender, nftAddress, tokenId);
    }

    function buyNFT(address nftAddress, uint256 tokenId) external {
        Offer memory offer = offers[nftAddress][tokenId];
        require(offer.isForSale, "NFT not for sale");

        IERC20 paymentToken = IERC20(offer.paymentToken);
        uint256 balanceOfBuyer = paymentToken.balanceOf(msg.sender);
        require(balanceOfBuyer >= offer.price, "Insufficient token balance");

        offer.isForSale = false;

        // Transfer ERC20 token from buyer to seller
        paymentToken.transferFrom(msg.sender, offer.seller, offer.price);

        // Transfer NFT to the buyer
        IERC721Upgradeable(offer.nftAddress).transferFrom(
            address(this),
            msg.sender,
            offer.tokenId
        );

        emit NFTPurchased(
            offer.seller,
            nftAddress,
            tokenId,
            msg.sender,
            offer.price
        );
    }
}
