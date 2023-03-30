import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ProptechAgreement } from "../typechain-types";

describe("Proptech agreement", function () {
    let pa: ProptechAgreement;
    
    it("Should deploy the agreement", async function () {
        const ProptechAgreement = await ethers.getContractFactory("ProptechAgreement");
        pa = await  ProptechAgreement.deploy()    
    });



});
