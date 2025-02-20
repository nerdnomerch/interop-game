import { Server, Socket } from "socket.io";
import { GameState } from "./GameState";
import { PlayerData, InputState } from "./types";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

export function setupGameSockets(io: Server) {
  const gameState = new GameState();

  io.on("connection", (socket: Socket) => {
    const startX = Math.random() * GAME_WIDTH;
    const startY = Math.random() * GAME_HEIGHT;

    socket.on("playerData", (playerData: PlayerData) => {
      gameState.addPlayer(socket.id, {
        x: startX,
        y: startY,
        name: playerData.name,
        spriteId: playerData.spriteId,
      });
      emitGameState();
    });

    socket.on("playerInput", (inputState: InputState) => {
      gameState.update(socket.id, inputState);
      emitGameState();
    });

    socket.on("disconnect", () => {
      console.log("Player disconnected:", socket.id);
      gameState.removePlayer(socket.id);
      emitGameState();
    });

    function emitGameState() {
      io.emit("gameState", {
        players: Array.from(gameState.players.entries()).map(
          ([id, player]) => ({
            id,
            ...player,
          })
        ),
        slimes: gameState.slimes,
      });
    }
  });
}
