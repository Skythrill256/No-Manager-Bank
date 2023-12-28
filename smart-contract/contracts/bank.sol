//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19 ;
contract bank {
    uint totalContractBalance =0;
    function getContractBalance () public view returns (uint256){
        return totalContractBalance;
    }
    mapping (address=>uint256) balences;
    mapping (address =>uint) userTimestamp;
    function addBalence () public payable returns(bool){
        require(msg.value>0,"The payment must be greater than 0");
        balences[msg.sender] = msg.value;
        totalContractBalance = totalContractBalance + msg.value;
        userTimestamp[msg.sender] = block.timestamp;
        return true;
    }
    function getBalance (address userAddress) public view returns (uint256){
        uint256 principal = balences[userAddress];
        uint256 timeElapsed = block.timestamp - userTimestamp[userAddress];
        return principal + uint256((principal*7*timeElapsed)/(100*365*24*60*60));

    }
    function withdraw () public payable returns (bool){
        address payable withdrawTo = payable(msg.sender);
        uint256 amountToTransfer = getBalance(msg.sender);
        balences[msg.sender]= 0;
        totalContractBalance = totalContractBalance - amountToTransfer;
        (bool sent,) = withdrawTo.call{value: amountToTransfer}("");
        require(sent , "transfer failed");
        return true;
    }
    function addMoneyToContract () public payable{
        totalContractBalance += msg.value;
    }
    receive() external payable {}
}
