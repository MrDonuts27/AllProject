// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract University {
    address public owner;
    uint256 public minimumPayment;
    uint256 public maximumPayment;
    uint256 public totalFees;

    function getVersion() public view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }

    function getPrice() public view returns (uint256){
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer);
    }  

    function getConversionRate(uint256 ethAmount) public view returns (uint256) {
        uint256 ethPrice = getPrice() / 10**8;
        uint256 ethAmountInUSD = ethPrice * ethAmount;
        return ethAmountInUSD;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    constructor() {
        owner = msg.sender;
        minimumPayment = getConversionRate(210);
        maximumPayment = getConversionRate(520);
    }

    function register() public payable {
        require(msg.value >= minimumPayment, "Payment must be at least 210 USD.");
        require(msg.value <= maximumPayment, "Payment cannot exceed 520 USD.");
        totalFees += msg.value;
    }

    function withdrawFees() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
