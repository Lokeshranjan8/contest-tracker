import { useState, useEffect } from "react";

export default function Regform() {
  const [cfhandle, setCfhandle] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  console.log(email);

  return (
    <main className="flex-1 flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-gray-800">
          Enter Your Credentials!
        </h2>

        <form method="post" className="space-y-6">
          <div className="border border-gray-300 rounded-md px-3 py-2">
            <input
              type="text"
              name="cfhandle"
              value={cfhandle}
              onChange={(e) => setCfhandle(e.target.value)}
              placeholder="Enter Your Codeforces Handle"
              className="w-full focus:outline-none text-gray-800 bg-transparent"
            />
          </div>

          <div className="border border-gray-300 rounded-md px-3 py-2">
            <input
              type="email"
              name="email"
              value={email}
              className="w-full focus:outline-none text-gray-800 bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full text-base bg-cyan-600 text-white py-3 rounded-md font-semibold hover:bg-cyan-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
