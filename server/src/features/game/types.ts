export interface PlayerData {
  x?: number;
  y?: number;
  name?: string;
  spriteId?: string;
  animation?: string;
  flipX?: boolean;
}

export interface InputState {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
}

export interface Slime {
  x: number;
  y: number;
  animation: string;
  flipX: boolean;
  velocityX: number;
  velocityY: number;
}

export interface Player {
  x: number;
  y: number;
  name: string;
  spriteId: string;
  animation: string;
  flipX: boolean;
}

export interface LevelData {
  width: number;
  height: number;
  tilewidth: number;
  tileheight: number;
  tilesets: {
    tiles?: {
      id: number;
      properties?: {
        name: string;
        value: boolean;
      }[];
    }[];
  }[];
  layers: {
    type: string;
    data: number[];
  }[];
}
