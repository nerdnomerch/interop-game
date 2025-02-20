import express from "express";
import cors from "cors";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupGameSockets } from "./features/game/socket";
import { AuthController } from "./features/auth/authController";

export function startServer(port: number) {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  // Middleware
  app.use(cors());
  app.use(express.json());

  // Routes
  app.post("/api/challenge", AuthController.getChallenge);
  app.post("/api/verify", AuthController.verifyChallenge);

  // Static files
  app.use(express.static(path.join(__dirname, "../../client/dist")));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });

  // Socket setup
  setupGameSockets(io);

  // Start server
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
