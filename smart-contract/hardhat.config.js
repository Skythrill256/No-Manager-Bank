require("@nomicfoundation/hardhat-toolbox");

const POLYGON_MUMBAI_RPC_URL =  "https://rpc.ankr.com/polygon_mumbai"
const PRIVATE_KEY = "95652d0d59c38c412a1a96ff3516eb0f12603dde31880b14cd51cda5fb5c4e07"
const POLYGONSCAN_API_KEY =  "SQQE1HZDPQPTEGITAGJ1SJ8H1DY45PIBXN"
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {},
    mumbai:{
      url: POLYGON_MUMBAI_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 80001,
    },
    
  },
  etherscan:{
    apiKey: POLYGONSCAN_API_KEY,
  }
};
