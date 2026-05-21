import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function BookingModal({ room, onClose }) {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  // MANUAL TIME LIST
  const times = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
  ];

  // SHOW / HIDE
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  // CALC COST
  const totalHours = endTime && startTime
    ? parseInt(endTime.split(":")[0]) - parseInt(startTime.split(":")[0])
    : 0;
  const totalCost = totalHours * (room?.hourlyRate || 0);

  // BOOK FUNCTION
  const handleBook = async () => {
    if (!date || !startTime || !endTime) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/bookings", {
        roomId: room._id,
        date,
        startTime,
        endTime,
        totalCost,
      });
      toast.success("Booking success!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#0f172a] border border-white/10 p-6 shadow-xl">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Book Room</h3>
          <button onClick={onClose} className="text-white/70 text-2xl">×</button>
        </div>

        {/* ROOM INFO */}
        <div className="bg-white/5 p-3 rounded-xl mb-4">
          <p className="text-white/60 text-sm">Booking</p>
          <p className="text-white font-medium">{room.name}</p>
          <p className="text-blue-400 text-sm">${room.hourlyRate}/hr</p>
        </div>

        {/* DATE */}
        <div className="mb-3">
          <label className="text-white/70 text-sm block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#1e293b] border border-white/10 text-white rounded-xl px-4 py-3"
          />
        </div>

        {/* START TIME — UL LI MANUAL */}
        <div className="relative mb-3">
          <label className="text-white/70 text-sm block mb-1">Start Time</label>
          <button
            onClick={() => { setShowStart(!showStart); setShowEnd(false); }}
            className="w-full bg-[#1e293b] border border-white/10 text-white rounded-xl px-4 py-3 text-left"
          >
            {startTime || "Select Start Time"}
          </button>

          {showStart && (
            <ul className="absolute bg-[#1e293b] border border-white/10 w-full max-h-48 overflow-y-auto rounded-xl mt-1 z-50">
              {times.map((t) => (
                <li
                  key={t}
                  onClick={() => { setStartTime(t); setShowStart(false); }}
                  className="px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* END TIME — UL LI MANUAL */}
        <div className="relative mb-3">
          <label className="text-white/70 text-sm block mb-1">End Time</label>
          <button
            onClick={() => { setShowEnd(!showEnd); setShowStart(false); }}
            className="w-full bg-[#1e293b] border border-white/10 text-white rounded-xl px-4 py-3 text-left"
          >
            {endTime || "Select End Time"}
          </button>

          {showEnd && (
            <ul className="absolute bg-[#1e293b] border border-white/10 w-full max-h-48 overflow-y-auto rounded-xl mt-1 z-50">
              {times.filter(t => !startTime || t > startTime).map((t) => (
                <li
                  key={t}
                  onClick={() => { setEndTime(t); setShowEnd(false); }}
                  className="px-4 py-2 text-white hover:bg-blue-600 cursor-pointer"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* TOTAL */}
        {totalCost > 0 && (
          <p className="text-center text-blue-400 font-bold my-2">
            Total: ${totalCost}
          </p>
        )}

        {/* BUTTONS */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleBook}
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl"
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}