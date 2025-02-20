import { Alchemy, Network } from "alchemy-sdk";

// Network Configuration
const NETWORK = {
  rpc: import.meta.env.VITE_RPC_URL || "https://rpc.sepolia.org",
  explorerUrl:
    import.meta.env.VITE_EXPLORER_URL ||
    "https://explorer-sepolia.shape.network/",
  alchemyApiKey: import.meta.env.VITE_ALCHEMY_API_KEY || "your-default-api-key",
  sdkNetwork: import.meta.env.VITE_SDK_NETWORK || Network.SHAPE_SEPOLIA,
} as const;

export const alchemyClient = new Alchemy({
  apiKey: NETWORK.alchemyApiKey,
  network: NETWORK.sdkNetwork as Network,
});

// Auth Configuration
const AUTH = {
  authServerUrl:
    import.meta.env.VITE_AUTH_SERVER_URL || "http://localhost:3022",
  nomadServerUrl:
    import.meta.env.VITE_NOMAD_SERVER_URL || "http://localhost:3000/connect",
} as const;

// Game Configuration
const GAME = {
  title: import.meta.env.VITE_GAME_TITLE || "Game",
  inventoryBgColor: import.meta.env.VITE_INVENTORY_BG_COLOR || "0x2d2d2d",
  socketUrl: import.meta.env.VITE_SOCKET_URL || "http://localhost:3022",
} as const;

// Alchemy Configuration
const ALCHEMY = {
  network: Network.SHAPE_SEPOLIA,
} as const;

export const CONFIG = {
  ...NETWORK,
  ...AUTH,
  ...GAME,
  ...ALCHEMY,
} as const;

export type Config = typeof CONFIG;
