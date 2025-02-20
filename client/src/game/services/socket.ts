import { io } from "socket.io-client";
import { CONFIG } from "../../config";

export const socket = io(CONFIG.socketUrl);
