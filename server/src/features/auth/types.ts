export interface ChallengeResponse {
  challengeId: string;
  challenge: string;
}

export interface VerifyRequest {
  challengeId: string;
  signature: string;
  salt: number;
  sca: string;
}

export interface VerifyResponse {
  success: boolean;
  address?: string | null;
  error?: string;
}
