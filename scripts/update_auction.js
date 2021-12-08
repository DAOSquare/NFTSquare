require("dotenv").config();
// const { ethers } = require("ethers");
const hre = require("hardhat");
const { TREASURY_ADDRESS, PLATFORM_FEE } = require("./constants");

async function main() {
  const signer = await hre.ethers.getSigners()[0];
  //   console.log(signer[0]);
  //   function getContractAt(nameOrAbi: string | any[], address: string, signer?: ethers.Signer): Promise<ethers.Contract>;
  const ProxyAdmin = await hre.ethers.getContractAt(
    "ProxyAdmin",
    "0x2f73584eDFdfFF19eE55FE17337740Bc2cb70fEc",
    signer
  );
  //   const marketplaceProxy = await hre.ethers.getContractAt(
  //     "AdminUpgradeabilityProxy",
  //     "0x3eEDfB9445886f6260ECbf5fe3480fE4f2F15beC",
  //     signer
  //   );

  const Marketplace = await ethers.getContractFactory(
    "FantomAuction"
  );
  const marketplaceImpl = await Marketplace.deploy();
  await marketplaceImpl.deployed();

  const implAddress = marketplaceImpl.address;

  //   bundle proxy
  await ProxyAdmin.upgrade(
    "0x6d86ff91F5A77babb7852aD851062ebA9D4168D7",
    implAddress
  );

  console.log("upgrade success", implAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
