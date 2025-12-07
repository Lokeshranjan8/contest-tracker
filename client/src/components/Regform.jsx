import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorDisplay from "./ErrorDisplay";

export default function Regform() {
  const [cfHandle, setCfHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fatalError, setFatalError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const Baseurl = import.meta.env.VITE_API_BASE_URL || `http://localhost:${import.meta.env.VITE_BACKEND_PORT }`;
    const Baseurl = "http://localhost:5000";
    console.log("Using backend URL:", Baseurl);

    if (!cfHandle.trim()) {
      setError("Handle cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setFatalError(false);

      const response = await fetch(`${Baseurl}/profile/${cfHandle}`);
      
      if (!response.ok) {
          setFatalError(true);
          return;
      }

      const data = await response.json();
      localStorage.setItem("userHandle", cfHandle);
      navigate("/dashboard", { state: { profileData: data } });
    } catch (err) {
      if (!fatalError) {
        setError(err.message || "Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (fatalError) {
    return (
      <ErrorDisplay
        title="Oops!  Handle Not Found"
        error="We're sorry, but we couldn't find any profile associated with this handle. Please check the handle and try again."
        onRetry={() => {
          setFatalError(false);
          setError("");
          setCfHandle("");
        }}
        retryText="Retry"
      />
    );
  }

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-6 sm:py-10 mt-20 sm:mt-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-stone-900 rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-700">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-lg">
          Enter Your Handle!
        </h2>

        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Codeforces Handle
            </label>
            <div className={`border-2 ${error ? 'border-red-500' : 'border-gray-600'} rounded-xl px-3 sm:px-4 py-3 bg-gray-800/50`}>
              <input
                type="text"
                value={cfHandle}
                onChange={(e) => setCfHandle(e.target.value)}
                placeholder="e.g. tourist"
                disabled={loading}
                className="w-full bg-transparent text-white placeholder-gray-400 font-medium focus:outline-none text-sm sm:text-base"
              />
            </div>
            {error && <p className="text-red-400 mt-2 text-xs sm:text-sm">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-xl font-bold hover:from-cyan-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? "Loading..." : "Submit & Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
