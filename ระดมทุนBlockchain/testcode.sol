// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;


contract Token {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    constructor(uint256 _totalSupply, string memory _name, string memory _symbol) {
        totalSupply = _totalSupply * 10**uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        name = _name;
        symbol = _symbol;
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}


contract TokenCrowdsale {
    address public admin;
    Token public tokenContract;
    uint256 public tokenPrice;
    uint256 public tokensSold;

    event Sell(address indexed buyer, uint256 amount);

    constructor(Token _tokenContract, uint256 _tokenPrice) {
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    // ซื้อโทเค็นด้วยเงิน (ETH)
    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == _numberOfTokens * tokenPrice);

        uint256 scaledAmount = _numberOfTokens * (10**uint256(tokenContract.decimals()));
        require(tokenContract.balanceOf(address(this)) >= scaledAmount);

        tokenContract.transfer(msg.sender, scaledAmount);
        tokensSold += _numberOfTokens;

        emit Sell(msg.sender, _numberOfTokens);
    }

    // ออกโทเค็นคืนให้ผู้ส่งเงิน
    function withdrawTokens() public {
        require(msg.sender == admin);
        require(tokenContract.balanceOf(address(this)) > 0);

        uint256 unsoldTokens = tokenContract.balanceOf(address(this));
        tokenContract.transfer(admin, unsoldTokens);
    }

    // ออกเงิน (ETH) คืนให้ผู้ส่งเงิน
    function withdrawEther() public {
        require(msg.sender == admin);

        uint256 balance = address(this).balance;
        require(balance > 0);

        address payable adminPayable = payable(admin);
        adminPayable.transfer(balance);

    }
}
