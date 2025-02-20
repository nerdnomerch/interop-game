import { Player, PlayerData, InputState, Slime } from "./types";
import { CollisionMap } from "./CollisionMap";

export class GameState {
  private collisionMap: CollisionMap;
  public players: Map<string, Player>;
  public slimes: Slime[];

  constructor() {
    this.collisionMap = new CollisionMap();
    this.players = new Map<string, Player>();
    this.slimes = Array(10)
      .fill(null)
      .map(() => ({
        x: Math.random() * 800,
        y: Math.random() * 600,
        animation: "slimeIdleDown",
        flipX: false,
        velocityX: 0,
        velocityY: 0,
      }));
  }

  addPlayer(socketId: string, playerData: PlayerData = {}) {
    this.players.set(socketId, {
      x: playerData.x || 400,
      y: playerData.y || 300,
      name: playerData.name || "Player",
      spriteId: playerData.spriteId || "player1",
      animation: "idleDown",
      flipX: false,
    });
  }

  removePlayer(socketId: string) {
    this.players.delete(socketId);
  }

  update(socketId: string, inputState: InputState) {
    const player = this.players.get(socketId);
    if (!player) return;

    const speed = 160;
    const prevX = player.x;
    const prevY = player.y;
    let newX = player.x;
    let newY = player.y;

    // Calculate new position
    if (inputState.left) {
      newX -= speed * (1 / 60);
    } else if (inputState.right) {
      newX += speed * (1 / 60);
    }

    if (inputState.up) {
      newY -= speed * (1 / 60);
    } else if (inputState.down) {
      newY += speed * (1 / 60);
    }

    // Check collision before updating position
    if (!this.collisionMap.isColliding(newX, newY)) {
      player.x = newX;
      player.y = newY;
    }

    // Update animations
    if (inputState.left) {
      player.animation = "walkRight";
      player.flipX = true;
    } else if (inputState.right) {
      player.animation = "walkRight";
      player.flipX = false;
    }

    if (inputState.up) {
      player.animation = "walkUp";
    } else if (inputState.down) {
      player.animation = "walkDown";
    }

    // Handle idle animations
    if (
      !inputState.left &&
      !inputState.right &&
      !inputState.up &&
      !inputState.down
    ) {
      if (prevX > player.x) {
        player.animation = "idleRight";
        player.flipX = true;
      } else if (prevX < player.x) {
        player.animation = "idleRight";
        player.flipX = false;
      } else if (prevY > player.y) {
        player.animation = "idleUp";
      } else if (prevY < player.y) {
        player.animation = "idleDown";
      }
    }

    this.updateSlimes();
  }

  updateSlimes() {
    this.slimes.forEach((slime) => {
      if (Math.random() < 0.02) {
        const direction = Math.floor(Math.random() * 4);
        const speed = 50 + Math.random() * 100;

        switch (direction) {
          case 0:
            slime.velocityX = speed;
            slime.animation = "slimeHopRight";
            slime.flipX = false;
            break;
          case 1:
            slime.velocityX = -speed;
            slime.animation = "slimeHopRight";
            slime.flipX = true;
            break;
          case 2:
            slime.velocityY = speed;
            slime.animation = "slimeHopDown";
            break;
          case 3:
            slime.velocityY = -speed;
            slime.animation = "slimeHopUp";
            break;
        }
      }

      // Update slime positions
      slime.x += slime.velocityX * (1 / 60);
      slime.y += slime.velocityY * (1 / 60);
    });
  }

  updatePlayerInput(socketId: string, input: InputState) {
    const player = this.players.get(socketId);
    if (!player) return;

    // Update animation based on movement (without sprite prefix)
    if (input.left) {
      player.animation = "walkRight";
      player.flipX = true;
    } else if (input.right) {
      player.animation = "walkRight";
      player.flipX = false;
    } else if (input.up) {
      player.animation = "walkUp";
    } else if (input.down) {
      player.animation = "walkDown";
    } else {
      // Set idle animations based on last movement
      if (player.animation === "walkRight") player.animation = "idleRight";
      else if (player.animation === "walkUp") player.animation = "idleUp";
      else if (player.animation === "walkDown") player.animation = "idleDown";
    }

    // Update position
    if (input.left) player.x -= 5;
    if (input.right) player.x += 5;
    if (input.up) player.y -= 5;
    if (input.down) player.y += 5;
  }
}
