import { config } from "../../config";
import { generateChallenge, getContractAddress } from "./utils/ethereum";

// should use redis or a database
const challenges = new Map<string, string>();

export class AuthService {
  static generateNewChallenge(): { challengeId: string; challenge: string } {
    const challenge = generateChallenge();
    const challengeId = Math.random().toString(36).substring(7);
    challenges.set(challengeId, challenge);

    setTimeout(() => {
      challenges.delete(challengeId);
    }, config.challengeExpiryTime);

    return { challengeId, challenge };
  }

  static async verifyChallenge(
    challengeId: string,
    signature: string,
    salt: number,
    sca: string
  ): Promise<{ success: boolean; address: string | null }> {
    const challenge = challenges.get(challengeId);
    if (!challenge) {
      throw new Error("Challenge expired or invalid");
    }

    const predictedAddress = await getContractAddress(
      challenge,
      signature,
      salt
    );
    const isValid = predictedAddress.toLowerCase() === sca.toLowerCase();

    challenges.delete(challengeId);

    return { success: isValid, address: isValid ? sca : null };
  }
}
