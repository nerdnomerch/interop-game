import { useCallback } from "react";
import { CONFIG } from "../config";

export const LoginButton = () => {
  const handleLogin = useCallback(async () => {
    try {
      const response = await fetch(`${CONFIG.authServerUrl}/api/challenge`, {
        method: "POST",
      });
      const { challengeId, challenge } = await response.json();

      localStorage.setItem("auth_challenge_id", challengeId);

      const currentUrl = window.location.href;
      const urlWithoutParams = currentUrl.split("?")[0];
      const redirectUrl = encodeURIComponent(urlWithoutParams);
      const nomadUrl = `${CONFIG.nomadServerUrl}?challenge=${challenge}&redirect=${redirectUrl}`;
      window.location.href = nomadUrl;
    } catch (error) {
      console.error("Failed to get challenge:", error);
    }
  }, []);

  return (
    <button
      onClick={handleLogin}
      className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
    >
      Continue with Nomad
    </button>
  );
};
