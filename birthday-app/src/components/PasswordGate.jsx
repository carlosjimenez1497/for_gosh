import { useState } from "react";

export default function PasswordGate({ onSuccess }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  const PASSWORD = "0212";

  function check() {
    if (input === PASSWORD) {
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center text-center bg-pink-100 px-6">

      {/* Title */}
      <h2 className="text-pink-500 text-3xl sm:text-4xl font-bold mb-3">
        Welcome, Gosh 💖
      </h2>

      <p className="text-pink-400 text-lg sm:text-xl mb-6">
        Please enter the password to continue 🎀
      </p>

      {/* Password input */}
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-48 px-4 py-2 border-2 border-pink-300 rounded-xl mb-3 focus:outline-none focus:border-pink-400 bg-white"
      />

      {/* Button */}
      <button
        onClick={check}
        className="bg-pink-400 hover:bg-pink-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md shadow-pink-200 transition"
      >
        Enter
      </button>

      {/* Error message */}
      {error && (
        <p className="mt-3 text-pink-700 font-semibold">
          Wrong password ❌
        </p>
      )}
    </div>
  );
}
