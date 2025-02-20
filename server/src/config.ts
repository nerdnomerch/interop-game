import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3022,
  rpcUrl: process.env.RPC_URL || "https://rpc.sepolia.org",
  contractAddress:
    process.env.CONTRACT_ADDRESS ||
    "0x0000000000400CdFef5E2714E63d8040b700BC24",
  challengeExpiryTime: 5 * 60 * 1000, // 5 minutes
};

export const CONTRACT_ABI = [
  "function getAddress(address owner, uint256 salt) external view returns (address)",
];
