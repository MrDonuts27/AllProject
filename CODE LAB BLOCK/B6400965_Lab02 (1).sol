// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.6.0 <0.9.0;

contract Lab02 {
    struct Student {
        string stid;
        string fn;
        string sn;
        uint256 hn;
        string stn;
        string ct;
        uint256 pcd;
    }
   
    Student[] public ps;
    mapping(string => uint256) public sstid;
    
    function adddetail(string memory _stid, string memory _fn, string memory _sn, uint256 _hn, string memory _stn, string memory _ct, uint256 _pcd) public {
        ps.push(Student({stid: _stid, fn: _fn, sn: _sn, hn: _hn, stn: _stn, ct: _ct, pcd: _pcd}));
    }
    
    function Search(string memory _stid) public view returns (string memory, string memory, uint256, string memory, string memory, uint256) {
        Student memory student = ps[sstid[_stid]];
        return (student.fn, student.sn, student.hn, student.stn, student.ct, student.pcd);
    }
}
