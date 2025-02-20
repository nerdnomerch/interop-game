import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { createGameConfig } from "./config";
import { OwnedNft } from "alchemy-sdk";
import { CharacterSelect } from "./ui/CharacterSelect";
import { PlayerSelectData } from "./types";

export function Game({ playerNfts }: { playerNfts: OwnedNft[] }) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playerData, setPlayerData] = useState<PlayerSelectData | null>(null);

  useEffect(() => {
    if (!playerData || !containerRef.current) return;

    if (gameRef.current) {
      gameRef.current.destroy(true);
    }
    gameRef.current = new Phaser.Game(
      createGameConfig(containerRef.current.id, playerNfts, playerData)
    );

    return () => {
      gameRef.current?.destroy(true);
    };
  }, [playerNfts, playerData]);

  return (
    <div className="relative">
      {!playerData && (
        <CharacterSelect onSelect={setPlayerData} playerNfts={playerNfts} />
      )}
      <div id="phaser-container" ref={containerRef} className="h-[600px]" />
    </div>
  );
}
