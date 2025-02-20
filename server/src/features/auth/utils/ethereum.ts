import { ethers } from "ethers";
import { config, CONTRACT_ABI } from "../../../config";

export const generateChallenge = (): string => {
  // Generate 32 random bytes and convert to URL-safe base64
  return Buffer.from(ethers.randomBytes(32))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const recoverSigner = async (
  message: string,
  signature: string
): Promise<string> => {
  const msgHash = ethers.hashMessage(message);
  return ethers.recoverAddress(msgHash, signature);
};

export const getContractAddress = async (
  message: string,
  signature: string,
  salt: number
): Promise<string> => {
  try {
    const ownerAddress = await recoverSigner(message, signature);
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);

    const iface = new ethers.Interface(CONTRACT_ABI);
    const data = iface.encodeFunctionData("getAddress", [ownerAddress, salt]);

    const result = await provider.call({
      to: config.contractAddress,
      data: data,
    });

    return iface.decodeFunctionResult("getAddress", result)[0];
  } catch (error) {
    console.error("Error calling contract:", error);
    throw error;
  }
};
