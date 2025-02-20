import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CONFIG } from "../config";

interface HeaderProps {
  address: string;
}

export const Header = ({ address }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_challenge_id");
    navigate("/");
  };

  const handleViewOnExplorer = () => {
    window.open(`${CONFIG.explorerUrl}/address/${address}`, "_blank");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-sm text-gray-700 hover:text-gray-900 focus:outline-none"
      >
        <span>{`${address.slice(0, 6)}...${address.slice(-4)}`}</span>
        <svg
          className={`h-5 w-5 transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button
              onClick={handleViewOnExplorer}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              View on Explorer
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
