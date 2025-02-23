// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EduChainLanguagePlatform is ERC721URIStorage, Ownable {
    struct User {
        bool isRegistered;
        bool isPremium;
        uint256 subscriptionExpiry;
        uint256 progress;
        uint256 badgesEarned;
    }

    mapping(address => User) public users;
    uint256 private nextNFTId;
    uint256 public subscriptionFee = 0.1 ether; 
    uint256 public subscriptionDuration = 30 days;

    event UserRegistered(address indexed user);
    event SubscriptionPurchased(address indexed user, uint256 expiryDate);
    event ProgressUpdated(address indexed user, uint256 progress);
    event BadgeEarned(address indexed user, uint256 badgeCount);
    event NFTCertificateIssued(address indexed user, uint256 tokenId);

    constructor() ERC721("EduChainNFT", "EDU") Ownable(msg.sender) {}

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not registered");
        _;
    }

    modifier onlyPremium() {
        require(users[msg.sender].isPremium, "Upgrade to premium");
        _;
    }

    function registerUser() external {
        require(!users[msg.sender].isRegistered, "Already registered");
        users[msg.sender] = User(true, false, 0, 0, 0);
        emit UserRegistered(msg.sender);
    }

    function purchaseSubscription() external payable onlyRegistered {
        require(msg.value >= subscriptionFee, "Insufficient funds");
        users[msg.sender].isPremium = true;
        users[msg.sender].subscriptionExpiry = block.timestamp + subscriptionDuration;
        emit SubscriptionPurchased(msg.sender, users[msg.sender].subscriptionExpiry);
    }

    function updateProgress(uint256 _progress) external onlyRegistered {
        users[msg.sender].progress += _progress;
        emit ProgressUpdated(msg.sender, users[msg.sender].progress);

        // Earn a badge every 10 progress points
        if (users[msg.sender].progress % 10 == 0) {
            users[msg.sender].badgesEarned++;
            emit BadgeEarned(msg.sender, users[msg.sender].badgesEarned);
        }
    }

    function issueNFTCertificate(string memory _tokenURI) external onlyRegistered {
        require(users[msg.sender].progress >= 50, "Complete 50 progress points to earn NFT");

        uint256 tokenId = nextNFTId++;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        emit NFTCertificateIssued(msg.sender, tokenId);
    }

    function withdrawFunds() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function getUserInfo(address _user) external view returns (User memory) {
        return users[_user];
    }

    receive() external payable {} 
}