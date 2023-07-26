// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract CoffeeDelivery {
    struct Farm {
        uint256 productCode;
        string farmAddress;
        string orderList;
        string coffeePlantingTime;
        string coffeeSeedDetails;
        string orderDate;
        string deliveryDate;
    }

    struct Supplier {
        uint256 productCode;
        string buyerName;
        string buyerAddress;
        string deliveryDate;
        uint256 priceETH;
    }

    struct Recipient {
        uint256 productCode;
        string farmAddress;
        string orderList;
        string coffeeSeedDetails;
        string deliveryDate;
    }

    mapping(uint256 => Farm) public farms;
    mapping(uint256 => Supplier) public suppliers;
    mapping(uint256 => Recipient) public recipients;

    function addFarm(
        uint256 passcode,
        string memory farmAddress,
        string memory orderList,
        string memory coffeePlantingTime,
        string memory coffeeSeedDetails,
        string memory orderDate,
        string memory deliveryDate
    ) public {
        require(farms[passcode].productCode == 0);

        farms[passcode] = Farm(
            passcode,
            farmAddress,
            orderList,
            coffeePlantingTime,
            coffeeSeedDetails,
            orderDate,
            deliveryDate
        );
    }

    function addSupplier(
        uint256 passcode,
        string memory buyerName,
        string memory buyerAddress,
        string memory deliveryDate,
        uint256 priceETH
    ) public {
        require(farms[passcode].productCode != 0);
        require(suppliers[passcode].productCode == 0);

        suppliers[passcode] = Supplier(
            passcode,
            buyerName,
            buyerAddress,
            deliveryDate,
            priceETH
        );
    }

    function addRecipient(
        uint256 passcode,
        string memory farmAddress,
        string memory orderList,
        string memory coffeeSeedDetails,
        string memory deliveryDate
    ) public {
        require(farms[passcode].productCode != 0);
        require(recipients[passcode].productCode == 0);

        recipients[passcode] = Recipient(
            passcode,
            farmAddress,
            orderList,
            coffeeSeedDetails,
            deliveryDate
        );
    }

    function updateFarmStatus(uint256 passcode, string memory newStatus) public {
        Farm storage farm = farms[passcode];
        farm.deliveryDate = newStatus;
    }

    function updateSupplierStatus(uint256 passcode, string memory newStatus) public {
        Supplier storage supplier = suppliers[passcode];
        supplier.deliveryDate = newStatus;
    }

    function updateRecipientStatus(uint256 passcode, string memory newStatus) public {
        Recipient storage recipient = recipients[passcode];
        recipient.deliveryDate = newStatus;
    }

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    mapping(uint256 => uint256) public passcodeToAmountFunded;

    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }

    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer);
    }

    function calculateETHInUSD(uint256 passcode) public view returns (uint256,uint256) {
        require(suppliers[passcode].productCode != 0, "Invalid passcode");

        uint256 etham = suppliers[passcode].priceETH;
        uint256 ethPrice = getPrice() / 10**8;
        uint256 ethamInUSD = ethPrice * etham;
        return (ethamInUSD, suppliers[passcode].priceETH);
    }



function fund(uint256 passcode) public payable {
    require(farms[passcode].productCode != 0, "Invalid passcode");
    uint256 ethAmount = msg.value / 1 ether; 
    uint256 ethPrice = getPrice() / 10**8; 
    uint256 totalUSD = ethAmount * ethPrice; 
    
    require(totalUSD >= suppliers[passcode].priceETH, "Insufficient payment"); // เช็คว่าราคาที่จ่ายมาเพียงพอหรือไม่

    if (passcodeToAmountFunded[passcode] == 0) {
        passcodeToAmountFunded[passcode] = msg.value;
    } else {
        passcodeToAmountFunded[passcode] += msg.value;
    }
}



    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function withdraw(uint256 passcode) public onlyOwner payable {
        require(farms[passcode].productCode != 0);
        require(suppliers[passcode].productCode != 0);
        require(passcodeToAmountFunded[passcode] != 0);

        uint256 amount = passcodeToAmountFunded[passcode];

        delete farms[passcode];
        delete suppliers[passcode];
        delete recipients[passcode];
        delete passcodeToAmountFunded[passcode];

        payable(msg.sender).transfer(amount);
    }

    function checkPaymentStatus(uint256 passcode) public view returns (bool, uint256, uint256) {
        if (farms[passcode].productCode == 0 || suppliers[passcode].productCode == 0 || passcodeToAmountFunded[passcode] == 0) {
            return (false, 0, 0);
        }

        return (true, passcode, passcodeToAmountFunded[passcode]);
    }
}
