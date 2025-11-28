import { useState } from "react";
import { days } from "./data/days";
import DayCard from "./components/DayCard";
import PasswordGate from "./components/PasswordGate";

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  // Password gate
  if (!authorized) {
    return <PasswordGate onSuccess={() => setAuthorized(true)} />;
  }

  return (
    <>
      {/* Floating Hearts Background */}
      <div className="hearts-container">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="heart"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              fontSize: `${16 + Math.random() * 20}px`,
              color: ["#FFB7D5", "#FF9BC7", "#FFC7E1", "#FFD6E9"][i % 4]
            }}
          >
            💗
          </span>
        ))}
      </div>

      {/* Main layout */}
      <div className="w-full min-h-screen flex justify-center bg-[#FFF7FB] relative z-10 px-4 py-6">
        <div className="max-w-xl w-full font-sans">

          {/* Cute Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-pink-500 mb-2">
              Hello Gosh! 💖
            </h1>

            <h2 className="text-xl sm:text-2xl text-pink-400 font-semibold mb-1">
              This is your Birthday Countdown 🎀
            </h2>

            <p className="text-pink-300 text-base sm:text-lg">
              Answer a small question each day to see the secret message ✨
            </p>
          </div>

          {/* Day cards */}
          {days.map((d) => (
            <DayCard key={d.id} day={d} today={today} />
          ))}

        </div>
      </div>
    </>
  );
}
