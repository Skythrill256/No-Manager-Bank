const { expect } = require('chai');

describe('Bank Contract', function () {
  let Bank;
  let bank;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    Bank = await ethers.getContractFactory('Bank');
    bank = await Bank.connect(owner).deploy();
    await bank.deployed();
  });

  it('Should deposit ether and calculate interest', async function () {
    const initialBalance = await bank.getContractBalance();

    
    await bank.connect(addr1).addBalance({ value: ethers.utils.parseEther('1.0') });

    
    const balanceWithInterest = await bank.getBalance(addr1.address);

  
    expect(balanceWithInterest).to.gt(ethers.utils.parseEther('1.0'));

    
    const finalBalance = await bank.getContractBalance();
    expect(finalBalance).to.equal(initialBalance.add(ethers.utils.parseEther('1.0')));
  });

  it('Should allow withdrawal of funds', async function () {
    await bank.connect(addr1).addBalance({ value: ethers.utils.parseEther('1.0') });

    const balanceBeforeWithdrawal = await bank.getBalance(addr1.address);
    expect(balanceBeforeWithdrawal).to.gt(0);

    
    await bank.connect(addr1).withdraw();

    const balanceAfterWithdrawal = await bank.getBalance(addr1.address);
    expect(balanceAfterWithdrawal).to.equal(0);
  });


});

