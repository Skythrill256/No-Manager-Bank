// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract bank  {
    address public owner;
    constructor (){
      owner = msg.sender;
    }
    uint totalContractBalance = 0;
    mapping (address => uint256) balances;
    mapping (address => uint) lastUpdated;

    function getContractBalance() public view returns (uint256) {
        return totalContractBalance;
    }

    function addBalance() public payable returns(bool) {
        require(msg.value > 0, "The payment must be greater than 0");
        balances[msg.sender] += msg.value;
        totalContractBalance += msg.value;
        lastUpdated[msg.sender] = block.timestamp;
        return true;
    }

    function getBalance(address userAddress) public view returns (uint256) {
        uint256 principal = balances[userAddress];
        uint256 timeElapsed = block.timestamp - lastUpdated[userAddress];
        uint256 interest = (principal * 7 * timeElapsed) / (100 * 365 * 24);

        return principal + interest;
    }

    function withdraw() public returns (bool) {
        uint256 amountToTransfer = getBalance(msg.sender);
        require(amountToTransfer > 0, "Insufficient funds");

        balances[msg.sender] = 0;
        totalContractBalance -= amountToTransfer;

        (bool sent, ) = payable(msg.sender).call{value: amountToTransfer}("");
        require(sent, "Transfer failed");

        return true;
    }

    function addMoneyToContract() public payable {
        totalContractBalance += msg.value;
    }

     receive() external payable {}
}

