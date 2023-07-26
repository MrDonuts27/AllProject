// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.9.0;

contract Lab03parent {
    struct football {
        string fid;
        string fn;
        string sn;
        string na;
        uint256 snum;
        string po;
        
    }
   
    football [] public ps;
    mapping(string => uint256) public sstid;
    
    function adddetail(string memory _fid, string memory _fn, string memory _sn, string memory _na, uint256 _snum, string memory _po) public {
        ps.push(football({fid: _fid, fn: _fn, sn: _sn, na: _na, snum: _snum, po: _po}));
    }
    
    function Search(string memory _fid) public view returns (string memory,string memory, string memory, string memory, uint256, string memory) {
        football memory football = ps[sstid[_fid]];
        return (football.fid,football.fn, football.sn, football.na, football.snum, football.po);
    }
}
