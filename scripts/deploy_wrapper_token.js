async function main() {
    const MyToken = await ethers.getContractFactory('MyToken');
    const contract = await MyToken.deploy();
  
    await contract.deployed();
  
    console.log('Wrapper deployed to', contract.address);
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  