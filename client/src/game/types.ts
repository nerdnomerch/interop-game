export interface PlayerData {
  id: string;
  x: number;
  y: number;
  spriteId: string;
  name?: string;
  animation?: string;
  flipX?: boolean;
}

export interface SlimeData {
  x: number;
  y: number;
  animation?: string;
  flipX?: boolean;
}

export interface GameState {
  players: PlayerData[];
  slimes: SlimeData[];
}

export interface PlayerSelectData {
  playerName: string;
  selectedSprite: string;
}
