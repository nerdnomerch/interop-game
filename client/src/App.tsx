import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GamePage } from "./pages/GamePage";
import { LoginContainer } from "./components/LoginContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
              <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                  <h2 className="mt-6 text-3xl font-bold text-gray-900">
                    Ready to play?
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Sign in with Nomad to jump into the game
                  </p>
                </div>
                <LoginContainer />
              </div>
            </div>
          }
        />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
