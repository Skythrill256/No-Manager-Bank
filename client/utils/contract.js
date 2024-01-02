import ethers from 'ethers'
import bank from "./bank.json"

const ABI = bank.ABI

export const contract = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contractReader = new ethers.Contract(address, ABI, signer)
  return contractReader
  }

