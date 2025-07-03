import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
import ErrorDisplay from "./ErrorDisplay";

export default function Regform() {
  const [cfhandle, setCfhandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (!cfhandle.trim()) {
      setError("Please enter a handle.");
      return;
    }

    setLoading(true); 
    setError(null);

    try {
      const response = await fetch(`http://localhost:3000/profile/${cfhandle}`);
      if (!response.ok) throw new Error("Invalid handle or network error");

      const data = await response.json();

      localStorage.setItem("userHandle", cfhandle);
      
      navigate("/dashboard", { state: { profileData: data } });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <LoadingSpinner 
        title="Loading Your Profile" 
        subtitle="Fetching your contest data and statistics..." 
      />
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        onRetry={() => {
          setError(null);
          setCfhandle("");
        }}
        retryText="Try Again"
      />
    );
  }

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-10 mt-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-stone-900 rounded-2xl shadow-xl p-8 border border-gray-700">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          Enter Your Credentials! 🚀
        </h2>

        <form method="post" className="space-y-6" onSubmit={handlesubmit}>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Codeforces Handle
            </label>
            <div className="border-2 border-gray-600 rounded-xl px-4 py-3 bg-gray-800/50 backdrop-blur-sm focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all duration-300">
              <input
                type="text"
                name="cfhandle"
                value={cfhandle}
                onChange={(e) => setCfhandle(e.target.value)}
                placeholder="Enter Your Codeforces Handle"
                required
                className="w-full focus:outline-none text-white bg-transparent placeholder-gray-400 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full text-base bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 border border-cyan-500"
          >
            ✨ Submit & Continue
          </button>
        </form>
      </div>
    </main>
  );
}
