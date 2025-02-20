import { startServer } from "./server";
import { config } from "./config";

startServer(Number(config.port));
