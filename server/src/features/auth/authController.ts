import { Request, Response } from "express";
import { AuthService } from "./authService";
import { VerifyRequest } from "./types";

export class AuthController {
  static async getChallenge(_req: Request, res: Response) {
    const result = AuthService.generateNewChallenge();
    res.json(result);
  }

  static async verifyChallenge(req: Request, res: Response) {
    const { challengeId, signature, salt, sca } = req.body as VerifyRequest;

    try {
      const result = await AuthService.verifyChallenge(
        challengeId,
        signature,
        Number(salt),
        sca
      );
      res.json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Verification failed",
      });
    }
  }
}
