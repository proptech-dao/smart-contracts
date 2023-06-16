// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IRuler {
    function rule(uint256 caseId, uint256 result) external;
}
