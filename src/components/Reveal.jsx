import { useState } from "react";

export default function Reveal({ data, stage, onRevealReal, onRevealGhibli }) {
  // Coupon state
  const [couponRevealed, setCouponRevealed] = useState(
    localStorage.getItem(`coupon-${data.id}`) === "true"
  );

  function revealCoupon() {
    localStorage.setItem(`coupon-${data.id}`, "true");
    setCouponRevealed(true);
  }

  // --- NEW: images array depending on stage ---
  const imgArray =
    stage === "ghibli"
      ? data.ghibliImages || []
      : data.images || [];

  // Fallback for old format (single string)
  const normalizedImages =
    typeof imgArray === "string" ? [imgArray] : imgArray;

  // --- NEW: carousel state ---
  const [index, setIndex] = useState(0);

  function nextImage() {
    setIndex((prev) => (prev + 1) % normalizedImages.length);
  }

  function prevImage() {
    setIndex((prev) =>
      prev === 0 ? normalizedImages.length - 1 : prev - 1
    );
  }

  return (
    <div className="text-center">

      {/* GHIBLI MODE */}
      {stage === "ghibli" && (
        <div>

          {/* --- Carousel container --- */}
          <div className="relative w-64 mx-auto mb-4">
            <img
              src={normalizedImages[index]}
              className="w-64 mx-auto rounded-xl shadow-md opacity-90"
              alt=""
            />

            {/* Left arrow */}
            {normalizedImages.length > 1 && (
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70
                           p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
              >
                ←
              </button>
            )}

            {/* Right arrow */}
            {normalizedImages.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70
                           p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
              >
                →
              </button>
            )}
          </div>

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
          
          {/* --- Carousel container --- */}
          <div className="relative w-64 mx-auto mb-4">
            <img
              src={normalizedImages[index]}
              className="w-64 mx-auto rounded-xl shadow-md"
              alt=""
            />

            {/* Arrows */}
            {normalizedImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70
                             p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
                >
                  ←
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-70
                             p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Back to Ghibli */}
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
                            text-pink-700 font-semibold mt-3 shadow-sm whitespace-pre-line">
              🎀 Coupon: {data.coupon}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
