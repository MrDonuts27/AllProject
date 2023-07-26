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
    //function ในการค้นหาข้อมูลที่ถูกบันทึกเข้าไปใน Farm,Supplier,Recipient
    mapping(uint256 => Farm) public farms;
    mapping(uint256 => Supplier) public suppliers;
    mapping(uint256 => Recipient) public recipients;

    //function เพิ่มข้อมูลเข้าไปใน Farmโดย(addFarm),Supplierโดย(addSupplier),Recipientโดย(addRecipient)
    function addFarm(
        uint256 passcode,
        string memory farmAddress,
        string memory orderList,
        string memory coffeePlantingTime,
        string memory coffeeSeedDetails,
        string memory orderDate,
        string memory deliveryDate
    ) public {
        // Function จะตรวจสอบว่าPasscode ทีทางFarmกรอกไปถูกเพิ่มไปก่อนหน้าแล้วหรือไม่หากถูกเพิ่มไปก่อนแล้วทางFarmจะไม่สามารถเพิ่มข้อมูลเข้าไปได้จนกว่าจะเปลี่ยนเลข Passcode
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
        //Function จะตรวจสอบเลขPasscode ที่ผู้ใช้กรอกเข้าไปว่าตรงกับเลขที่มีอยู่ในfarm หรือไม่หากไม่ตรงผู้ใช้จะไม่สามารถุเพิ่มข้อมูลเข้าไปในระบบได้
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
        //Function จะตรวจสอบเลขPasscode ที่ผู้ใช้กรอกเข้าไปว่าตรงกับเลขที่มีอยู่ในfarm หรือไม่หากไม่ตรงผู้ใช้จะไม่สามารถุเพิ่มข้อมูลเข้าไปในระบบได้ 
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
    
    //function อัปเดทข้อมูล deliveryDate อัปเดท Farmโดย(updateFarmStatus),Supplierโดย(updateSupplierStatus),Recipientโดย(updateRecipientStatus)
    function updateFarmStatus(uint256 passcode, string memory newStatus) public {
        Farm storage farm = farms[passcode];
        farm.deliveryDate = newStatus;
    }
    //function อัปเดทข้อมูล deliveryDate
    function updateSupplierStatus(uint256 passcode, string memory newStatus) public {
        Supplier storage supplier = suppliers[passcode];
        supplier.deliveryDate = newStatus;
    }
    //function อัปเดทข้อมูล deliveryDate
    function updateRecipientStatus(uint256 passcode, string memory newStatus) public {
        Recipient storage recipient = recipients[passcode];
        recipient.deliveryDate = newStatus;
    }

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    mapping(uint256 => uint256) public passcodeToAmountFunded;

    //function getVersion คืนค่าเวอร์ชันของอินเทอร์เฟซ AggregatorV3Interface ที่ใช้ในการรับข้อมูลราคา
    function getVersion() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        return priceFeed.version();
    }
    //function getPrice: คืนค่าราคาล่าสุดของ ETH ในรูปแบบ USD
    function getPrice() public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer);
    }
    //function calculateETHInUSD: คำนวณเงินจากค่า ETHเป็นUSD โดยอิงค่าเงินปัจจุบัน
    function calculateETHInUSD(uint256 passcode) public view returns (uint256,uint256) {
        //จะตรวจสอบโดยใช้ passcpodeว่าpasscode ที่กรอกมานั้นมีรหัส passcode อยู่ใน farms หรือไม่หากไม่มีระบบจะ Errorและคืนค่า "Invalid passcode" 
        require(suppliers[passcode].productCode != 0, "Invalid passcode");
        //Function นีจะทำการคำนวณและแปลงค่าเงินที่ได้จาก priceETH มาเป็น USD โดยอิงค่างเงินในปัจจุบัน เพื่อให้ผู้ใช้สามารถทราบได้ว่าเงินที่จ่ายไปมีค่าเป็น เท่าไหร่ในค่าเงิน USD 
        uint256 etham = suppliers[passcode].priceETH;
        uint256 ethPrice = getPrice() / 10**8;
        uint256 ethamInUSD = ethPrice * etham;
        return (ethamInUSD, suppliers[passcode].priceETH);
    }


    //function fund:เป็นการจ่ายเงินโดยการอิงค่าเงินจาก priceETH ของpasscoodeนั้น
    function fund(uint256 passcode) public payable {
        //จะตรวจสอบโดยใช้ passcpodeว่าpasscode ที่กรอกมานั้นมีรหัส passcode อยู่ใน farms หรือไม่หากไม่มีระบบจะ Errorและคืนค่า "Invalid passcode" 
        require(farms[passcode].productCode != 0, "Invalid passcode");
        //คำนวณค่าเงินหากของมีราคา 1 priceETH ผู้ใข้ไม่สามารถโอนเงิน 1 wei ได้ เพราะ function จะทำการตรวจสอบ่และแปลงค่าเงินที่ได้ให้เป็น ETH  
        uint256 ethAmount = msg.value / 1 ether; 
        uint256 ethPrice = getPrice() / 10**8; 
        uint256 totalUSD = ethAmount * ethPrice; 
    
        require(totalUSD >= suppliers[passcode].priceETH, "Insufficient payment"); 

        if (passcodeToAmountFunded[passcode] == 0) {
        passcodeToAmountFunded[passcode] = msg.value;
         } else {
        passcodeToAmountFunded[passcode] += msg.value;
        }
    }


    //กำหนดให้ onlyOwner มีค่าเป็น owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //function ถอนเงินโดยกำหนดให้แค่ผู้ที่เป็นเจ้าของ Smartcontact เท่านั้น ที่จะสามารถถอนเงินออกจากระบบได้
    function withdraw(uint256 passcode) public onlyOwner payable {
        //จะตรวจสอบโดยใช้ passcpodeว่าpasscode ที่กรอกมานั้นจ่ายเงินแล้วหรือไม่
        require(farms[passcode].productCode != 0);
        require(suppliers[passcode].productCode != 0);
        require(passcodeToAmountFunded[passcode] != 0);

        uint256 amount = passcodeToAmountFunded[passcode];
        //เมื่อุถอนเงินแล้วระบบจะทำการลบข้อมูลของpasscode นั้นทิ้งทั้งหมด
        delete farms[passcode];
        delete suppliers[passcode];
        delete recipients[passcode];
        delete passcodeToAmountFunded[passcode];
        delete suppliers[passcode].priceETH;
        //โอนเงินไปยังเจ้าของ smartcontact
        payable(msg.sender).transfer(amount);
    }
    
    //function checkPaymentStatus เอาไว้เช็คสถานะของการจ่ายเงิน ระบบจะทำการตรวจสอบว่า Passcode นั้นๆได้ทำการจ่ายเงินแล้วหรือยัง
    function checkPaymentStatus(uint256 passcode) public view returns (bool, uint256, uint256) {
        //ใช้ตรวจสอบว่าเลขPasscode ที่กรอกเข้ามานั้นมีค่าจริงหรอไม่แล้วมีจำนวนเงินที่อยู่ใน passcodeToAmountFunded หรือไม่หากมีระบบจะทำการ return True 
        if (farms[passcode].productCode == 0 || suppliers[passcode].productCode == 0 || passcodeToAmountFunded[passcode] == 0) {
            return (false, 0, 0);
        }

        return (true, passcode, passcodeToAmountFunded[passcode]);
    }
}
//function mapping(uint256 => Farm) public farms ในการค้นหาข้อมูลที่ถูกบันทึกเข้าไปใน Farm,Supplier,Recipient
//function function addFarm เพิ่มข้อมูลเข้าไปใน Farmโดย(addFarm),Supplierโดย(addSupplier),Recipientโดย(addRecipient)
//function function updateFarmStatus: อัปเดทข้อมูล deliveryDate อัปเดท Farmโดย(updateFarmStatus),Supplierโดย(updateSupplierStatus),Recipientโดย(updateRecipientStatus)
//function getVersion: คืนค่าเวอร์ชันของอินเทอร์เฟซ AggregatorV3Interface ที่ใช้ในการรับข้อมูลราคา
//function getPrice: คืนค่าราคาล่าสุดของ ETH ในรูปแบบ USD
//function calculateETHInUSD: คำนวณเงินจากค่า ETHเป็นUSD โดยอิงค่าเงินปัจจุบัน
//function fund:เป็นการจ่ายเงินโดยการอิงค่าเงินจาก priceETH ของpasscoodeนั้น
//กำหนดให้ onlyOwner: มีค่าเป็น owner
//function withdraw: ถอนเงินโดยกำหนดให้แค่ผู้ที่เป็นเจ้าของ Smartcontact เท่านั้น ที่จะสามารถถอนเงินออกจากระบบได้
//function checkPaymentStatus: เอาไว้เช็คสถานะของการจ่ายเงิน ระบบจะทำการตรวจสอบว่า Passcode นั้นๆได้ทำการจ่ายเงินแล้วหรือยัง
