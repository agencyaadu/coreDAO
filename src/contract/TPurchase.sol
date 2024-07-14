// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;


import "./Water.sol";

contract ProductPurchase{

    struct Purchase {
        address userWalletAddress;
        uint id;
        string productName;
        string productType;
        uint8 productQty;
        uint256 productCost;
        uint256 reward;
        uint256 timestamp;
    }

    Purchase[] public allPurchases;

    Water public water = new Water();

    function purchaseProduct(
        address usrAdd,
        uint productId, 
        string memory prodName, 
        string memory prodType, 
        uint8 qty,
        uint256 pCost, 
        uint256 rwd
    ) public {

        uint256 totalCost = pCost * qty;
        uint256 totalReward = rwd * 10**18 * qty;

        Purchase memory newPurchase = Purchase({
            userWalletAddress : usrAdd,
            id: productId,
            productName : prodName,
            productType : prodType,
            productQty : qty,
            productCost : totalCost, 
            reward : totalReward,
            timestamp : block.timestamp
        });


        allPurchases.push(newPurchase);
    }    

    // function recentPurchase() public view returns (address, string memory, uint8, uint256 rewd){
    //     return (userWalletAddress, productName, productQty, reward);
    // }

    function getAllPurchases() public view returns (Purchase[] memory) {
        return allPurchases;
    }

}