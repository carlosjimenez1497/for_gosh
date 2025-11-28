import { useState } from "react";
import Reveal from "./Reveal";

export default function QuestionPanel({ data }) {
  const answered = localStorage.getItem(`answered-${data.id}`) === "true";

  // Stage logic (question → ghibli → real)
  const [stage, setStage] = useState(answered ? "ghibli" : "question");
  const [input, setInput] = useState("");

  function check() {
    if (input.trim().toLowerCase() === data.answer.toLowerCase()) {
      localStorage.setItem(`answered-${data.id}`, "true");
      setStage("ghibli");
    }
  }

  // GHIBLI STAGE
  if (stage === "ghibli") {
    return (
      <Reveal
        data={data}
        stage="ghibli"
        onRevealReal={() => setStage("real")}
      />
    );
  }

  // REAL STAGE
  if (stage === "real") {
    return (
      <Reveal
        data={data}
        stage="real"
        onRevealGhibli={() => setStage("ghibli")}
      />
    );
  }

  // QUESTION STAGE
  return (
    <div>
      <p className="mb-3 text-gray-700 font-medium">
        {data.question}
      </p>

      {/* Text input */}
      <input
        className="w-full px-4 py-3 border-2 border-pink-300 rounded-xl mb-3
                   focus:outline-none focus:border-pink-400"
        placeholder="Your answer…"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Button */}
      <button
        className="bg-pink-400 hover:bg-pink-500 transition text-white
                   px-5 py-2 rounded-xl font-semibold shadow-md shadow-pink-200"
        onClick={check}
      >
        Check
      </button>
    </div>
  );
}
