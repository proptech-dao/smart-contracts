// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract NFT is ERC721, Ownable {
    constructor() ERC721("NFT", "NFT") {
        safeMint(_msgSender(), 0);
    }

    function safeMint(address to, uint256 tokenId) private onlyOwner {
        _safeMint(to, tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return "ipfs://bafybeicwdeo6nywiicnzr3v7wpgv3v2r63byniqcl2a3ifdjnadjvmdbea/";
    }
}