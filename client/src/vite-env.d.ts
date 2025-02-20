/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RPC_URL: string;
  readonly VITE_NETWORK_NAME: string;
  readonly VITE_EXPLORER_URL: string;
  readonly VITE_ALCHEMY_API_KEY: string;
  readonly VITE_AUTH_SERVER_URL: string;
  readonly VITE_GAME_TITLE: string;
  readonly VITE_INVENTORY_BG_COLOR: string;
  readonly VITE_SDK_NETWORK: string;
  readonly VITE_NOMAD_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
