import { alchemyClient } from "../config";

export const getNfts = async (address: string) => {
  try {
    const nfts = await alchemyClient.nft.getNftsForOwner(address);
    return nfts.ownedNfts || [];
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
};
