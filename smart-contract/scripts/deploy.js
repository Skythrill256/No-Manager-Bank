const { ethers } = require("hardhat");
const main = async () => {
  try {
    const Contract = await ethers.getContractFactory('bank');
    const contract = await Contract.deploy();
    console.log("Deploying ....");
    console.log("Deploying to Polygon Mumbai");
    await contract.waitForDeployment();
    const address = await contract.getAddress();
    console.log(`Deployed contract to, ${address}`);
  } catch (error) {
    console.error(error);
    process.exit(1); 
  }
};
main();
// contract address =  0xbfAc075B7FFbf5C3967c6E548645Ea3d7A4De0b6
