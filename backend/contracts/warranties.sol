// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Warranties is ERC721URIStorage {
    struct Purchase {
        uint256 token_id;
        uint256 time;
    }

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address private Admin;
    address[] private Brands;
    address[] private customers;

    mapping(address => uint256[]) private Owner2TokenIds;
    mapping(uint256 => uint256) private WarrantyStartTime;
    mapping(uint256 => uint256) private WarrantyValidity;
    mapping(uint256 => address[]) private transferHistory;
    mapping(address => Purchase[]) private purchaseHistory;

    constructor() ERC721("Warranties", "WTY") {
        Admin = msg.sender;
        Brands.push(Admin);
    }

    function checkExpiry(uint256 _tokenId) public returns(bool){
        uint256 time = block.timestamp - WarrantyStartTime[_tokenId];
        address token_owner = ownerOf(_tokenId);
        //from development purposes months are taken as minutes while checking
        if (time > WarrantyValidity[_tokenId]/(30*24*60*60)) {
            _burn(_tokenId);
            transferHistory[_tokenId].push(address(0));
            for (uint256 i = 0; i < Owner2TokenIds[token_owner].length; i++) {
                if (Owner2TokenIds[token_owner][i] == _tokenId) {
                    delete Owner2TokenIds[token_owner][i];
                    break;
                }
            }
            return true;
        }
        return false;
    }

    function add_brand(address _brand) public {
        Brands.push(_brand);
    }

    function create(string memory token_URI, uint256 months)
        public
        returns (uint256)
    {
        //check permissions
        //msg.sender must be a brand
        bool permission = false;
        for (uint256 i = 0; i < Brands.length; i++) {
            if (Brands[i] == msg.sender) {
                permission = true;
                break;
            }
        }
        require(
            permission,
            "You are required to be the one of the Brands or Admin to mint fresh warranties."
        );

        //minting process
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(msg.sender, tokenId);
        WarrantyStartTime[tokenId] = 1;
        WarrantyValidity[tokenId] = months * 30 * 24 * 60 * 60;
        _setTokenURI(tokenId, token_URI);
        Owner2TokenIds[msg.sender].push(tokenId);
        transferHistory[tokenId].push(msg.sender);
        return tokenId;
    }
    
    function getOwner(uint256 tokenId) public returns (address) {
        require(_exists(tokenId), "Token doesn't exists.");
        //check if sold or not
        if (WarrantyStartTime[tokenId] != 1) {
            if(checkExpiry(tokenId)){
                return address(0);
            }
        }
        return ownerOf(tokenId);
    }

    function transferWarranty(address to, uint256 tokenId) public {
        //check expiry if not first transfer
        if (WarrantyStartTime[tokenId] != 1) {
            if(checkExpiry(tokenId)){
                return;
            }
        }
        //see permissions
        require(
            msg.sender == ownerOf(tokenId),
            "you are not the Owner of this warranty"
        );
        //transfer
        safeTransferFrom(msg.sender, to, tokenId);
        for (uint256 i = 0; i < Owner2TokenIds[msg.sender].length; i++) {
            if (Owner2TokenIds[msg.sender][i] == tokenId) {
                delete Owner2TokenIds[msg.sender][i];
                break;
            }
        }
        Owner2TokenIds[to].push(tokenId);
        //update time start of warranty if sold by brand
        if (WarrantyStartTime[tokenId] == 1) {
            WarrantyStartTime[tokenId] = block.timestamp;
        }
        //update transfer history
        transferHistory[tokenId].push(to);
        customers.push(to);
        Purchase memory purchase = Purchase(tokenId, block.timestamp);
        purchaseHistory[to].push(purchase);
    }

    function listWarranties(address _Owner)
        public
        view
        returns (uint256[] memory)
    {
        // getter function for seeing array of token ID's belonging to input address.
        return Owner2TokenIds[_Owner];
    }

    function getTransferHistory(uint256 tokenId)
        public
        view
        returns (address[] memory)
    {
        return transferHistory[tokenId];
    }

    function getWarrantyStartTime(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        return WarrantyStartTime[tokenId];
    }

    function getWarrantyValidity(uint256 tokenId)
        public
        view
        returns (uint256)
    {
        return WarrantyValidity[tokenId];
    }

    function warrantyData(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    function getPurchaseHistory(address _customer)
        public
        view
        returns (Purchase[] memory)
    {
        return purchaseHistory[_customer];
    }
}
