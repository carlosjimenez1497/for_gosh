import { useState } from "react";

export default function Reveal({ data, stage, onRevealReal, onRevealGhibli }) {
  const [couponRevealed, setCouponRevealed] = useState(
    localStorage.getItem(`coupon-${data.id}`) === "true"
  );

  function revealCoupon() {
    localStorage.setItem(`coupon-${data.id}`, "true");
    setCouponRevealed(true);
  }

  // --- Get images depending on stage (supports both single + multiple) ---
  let rawImages;
  if (stage === "ghibli") {
    // Prefer array, fallback to single string
    rawImages = data.ghibliImages ?? data.ghibliImage ?? [];
  } else {
    rawImages = data.images ?? data.image ?? [];
  }

  let normalizedImages;
  if (Array.isArray(rawImages)) {
    normalizedImages = rawImages;
  } else if (typeof rawImages === "string" && rawImages) {
    normalizedImages = [rawImages];
  } else {
    normalizedImages = [];
  }

  const [index, setIndex] = useState(0);

  function nextImage() {
    setIndex((prev) =>
      normalizedImages.length > 0 ? (prev + 1) % normalizedImages.length : 0
    );
  }

  function prevImage() {
    setIndex((prev) =>
      normalizedImages.length > 0
        ? (prev === 0 ? normalizedImages.length - 1 : prev - 1)
        : 0
    );
  }

  const hasImages = normalizedImages.length > 0;
  const currentSrc = hasImages ? normalizedImages[index] : null;

  return (
    <div className="text-center">
      {/* GHIBLI MODE */}
      {stage === "ghibli" && (
        <div>
          {hasImages && (
            <div className="relative w-64 mx-auto mb-4">
              <img
                src={currentSrc}
                alt=""
                className="w-64 mx-auto rounded-xl shadow-md opacity-90"
              />

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
          )}

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
          {hasImages && (
            <div className="relative w-64 mx-auto mb-4">
              <img
                src={currentSrc}
                alt=""
                className="w-64 mx-auto rounded-xl shadow-md"
              />

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
          )}

          <button
            onClick={onRevealGhibli}
            className="bg-pink-200 hover:bg-pink-300 transition text-pink-700 
                       px-5 py-2 rounded-xl font-semibold shadow-md shadow-pink-100 mb-4"
          >
            Back to Animated 🌸
          </button>

          <h3 className="text-pink-500 font-bold text-lg mb-4">
            {data.message}
          </h3>

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
