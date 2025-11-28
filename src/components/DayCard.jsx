import QuestionPanel from "./QuestionPanel";

export default function DayCard({ day, today }) {
  const unlocked = day.date <= today;

  return (
    <div className="border-2 border-pink-300 rounded-2xl p-4 mb-5 bg-white shadow-md shadow-pink-200">
      
      <h2 className="mb-2 text-pink-500 font-semibold">
        Day {day.id} – {day.date}
      </h2>

      {!unlocked && (
        <p className="text-pink-300 italic">
          🔒 Locked — come back on {day.date}
        </p>
      )}

      {unlocked && (
        day.question ? (
          <QuestionPanel data={day} />
        ) : (
          <p className="text-pink-300 italic">
            A surprise will appear here soon 💕
          </p>
        )
      )}

    </div>
  );
}
