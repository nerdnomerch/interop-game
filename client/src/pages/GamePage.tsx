import { useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Game } from "../game/Game";
import { getNfts } from "../utils/nft";
import { OwnedNft } from "alchemy-sdk";

export function GamePage() {
  const location = useLocation();
  const address = location.state?.address;
  const [nfts, setNfts] = useState<OwnedNft[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNfts() {
      if (address) {
        const userNfts = await getNfts(address);
        setNfts(userNfts);
        setIsLoading(false);
      }
    }
    fetchNfts();
  }, [address]);

  if (!address) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Game</h1>
          <Header address={address} />
        </div>
        {!isLoading && <Game playerNfts={nfts} />}
      </div>
    </div>
  );
}
