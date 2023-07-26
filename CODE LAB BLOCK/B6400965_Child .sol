// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

import "./Lab03parent.sol";

contract Lab03Child {

 Lab03parent[] public  Lab3Array;

      function cssc () public {
        Lab03parent S_s = new Lab03parent();
        Lab3Array.push(S_s);
    }//Footballer’s ID ใช้เป็น Type String ตัวอย่าง F12345,F12346,F12347,...
    function fxadd(uint256 _Lab03Index,string memory _fid, string memory _fn, string memory _sn, string memory _na, uint256 _snum, string memory _po) public {
        Lab03parent FxLab03parent = Lab03parent(address(Lab3Array[_Lab03Index]));
        FxLab03parent.adddetail(_fid, _fn, _sn, _na, _snum, _po);
    }

 function fxsh(uint256 _Lab03Index) public view returns (string memory _fid, string memory _fn, string memory _sn, string memory _na, uint256 _snum, string memory _po) {
    Lab03parent FxLab03parent = Lab03parent(address(Lab3Array[_Lab03Index]));
    return FxLab03parent.Search(_fid);
    return (_fid, _fn, _sn, _na, _snum, _po);
    }
}

/*  Footballer’s ID ใช้เป็น Type String ตัวอย่าง F12345,F12346,F12347,...
    0,F12345,Mohamed Salah Hamed,Mahrous Ghaly,Egypt,11,Forward
    1,F12346,Erling Braut,Haaland,England,9,Striker 
*/