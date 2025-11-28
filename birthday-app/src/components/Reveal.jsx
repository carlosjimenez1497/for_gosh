import { useState } from "react";

export default function Reveal({ data, stage, onRevealReal, onRevealGhibli }) {
  const [couponRevealed, setCouponRevealed] = useState(
    localStorage.getItem(`coupon-${data.id}`) === "true"
  );

  function revealCoupon() {
    localStorage.setItem(`coupon-${data.id}`, "true");
    setCouponRevealed(true);
  }

  return (
    <div className="text-center">

      {/* GHIBLI MODE */}
      {stage === "ghibli" && (
        <div>
          <img
            src={data.ghibliImage}
            alt=""
            className="w-64 mx-auto rounded-xl mb-4 opacity-90 shadow-md"
          />

          <button
            onClick={onRevealReal}
            className="bg-pink-400 hover:bg-pink-500 transition text-white 
                       px-6 py-2 rounded-xl font-semibold shadow-md shadow-pink-200"
          >
            Show real photo ✨
          </button>
        </div>
      )}

      {/* REAL MODE */}
      {stage === "real" && (
        <div>
          <img
            src={data.image}
            alt=""
            className="w-64 mx-auto rounded-xl mb-4 shadow-md"
          />

          {/* Back button */}
          <button
            onClick={onRevealGhibli}
            className="bg-pink-200 hover:bg-pink-300 transition text-pink-700 
                       px-5 py-2 rounded-xl font-semibold shadow-md shadow-pink-100 mb-4"
          >
            Back to Animated 🌸
          </button>

          {/* Message */}
          <h3 className="text-pink-500 font-bold text-lg mb-4">
            {data.message}
          </h3>

          {/* Coupon */}
          {!couponRevealed ? (
            <button
              onClick={revealCoupon}
              className="bg-pink-200 hover:bg-pink-300 transition text-pink-700 
                         px-6 py-2 rounded-xl font-semibold shadow-md shadow-pink-200"
            >
              Reveal coupon 🎁
            </button>
          ) : (
            <div className="border-2 border-pink-300 rounded-xl p-4 bg-pink-50 
                            text-pink-700 font-semibold mt-3 shadow-sm">
              🎀 Coupon: {data.coupon}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
