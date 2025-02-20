import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CONFIG } from "../config";

export type AuthStatus = "idle" | "loading" | "success" | "error";

export const Authentication = ({
  onStatusChange,
}: {
  onStatusChange?: (status: AuthStatus) => void;
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<AuthStatus>("idle");

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  useEffect(() => {
    const verify = async () => {
      const sca = searchParams.get("sca");
      const signature = searchParams.get("signature");
      const salt = searchParams.get("salt");
      const challengeId = localStorage.getItem("auth_challenge_id");

      if (!sca || !signature || !salt || !challengeId) {
        return;
      }

      setStatus("loading");
      try {
        const response = await fetch(`${CONFIG.authServerUrl}/api/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            challengeId,
            signature,
            salt,
            sca,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setStatus("success");
          localStorage.removeItem("auth_challenge_id");
          navigate("/game", { state: { address: data.address } });
        } else {
          setStatus("error");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
      }
    };

    verify();
  }, [searchParams, navigate]);

  if (status === "idle") return null;
  if (status === "loading") {
    return (
      <div className="text-center py-4 text-gray-600">
        <div className="animate-pulse">Verifying your identity...</div>
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="text-center py-4 text-red-600">
        Authentication failed. Please try again.
      </div>
    );
  }
  return null;
};
