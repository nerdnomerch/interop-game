import { useState } from "react";
import { LoginButton } from "./LoginButton";
import { Authentication, AuthStatus } from "./Authentication";

export const LoginContainer = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>("idle");

  return (
    <div className="mt-8 space-y-6">
      {authStatus !== "loading" && <LoginButton />}
      <Authentication onStatusChange={setAuthStatus} />
    </div>
  );
};
