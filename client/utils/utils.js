import { contract } from "./contract"; 
import {toWei, toEth} from "./decimals"
const contractObj = await contract()

export const getBalence = async (address) =>{
  const contract_address = address
  const balance = await contractObj.getBalance(contract_address)
  return balance
}
export const addBalence = async (amount) =>{
  try{
     let tx = {value: toWei (amount)}
    const data = await contractObj.addBalence(tx)
    const reciept =await data.wait()
    return reciept
  }catch(error){
    console.error(error)
  }
}
export const withdraw = async () => {
  try {
    const data = await contractObj.withdraw({value: toEth('0') })
    const reciept = await data.wait()
    return reciept
  }catch(error){
    console.error(error)
  }
}
