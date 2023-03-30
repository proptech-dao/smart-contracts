// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @custom:security-contact pedrohba18@gmail.com
contract ProptechAgreement is ERC721 {
    constructor() ERC721("ProptechAgreement", "DAC") {
        _safeMint(msg.sender, 1);
         }

    function _baseURI() override internal view virtual returns (string memory) {
        return "bafybeid5bk5psrbbgk3m2eft47blcy4q4rkln4zgyhtbkpqbtpy2mc5hjy";
    }

    function version()  public pure returns (string memory) { 
        return "0.1.0";
    }
}