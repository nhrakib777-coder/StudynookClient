/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function RoomDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [note, setNote] = useState("");

  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00"
  ];

  const startHour = startTime ? parseInt(startTime.split(":")[0]) : 0;
  const endHour = endTime ? parseInt(endTime.split(":")[0]) : 0;
  const totalCost = (endHour - startHour) * (room?.hourlyRate || 0);

  // ✅ Moved inside useEffect to fix exhaustive-deps PERMANENTLY
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this room?")) return;
    try {
      await api.delete(`/rooms/${id}`);
      alert("Room deleted");
      navigate("/my-listings");
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleBookNow = async () => {
    if (!date || !startTime || !endTime) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      await api.post("/bookings", {
        roomId: room._id,
        date,
        startTime,
        endTime,
        totalCost,
        note,
      });

      alert("✅ Room booked successfully!");
      setShowBookingModal(false);
      resetForm();

      // Refresh data
      const res = await api.get(`/rooms/${id}`);
      setRoom(res.data);

    } catch (err) {
      alert(err.response?.data?.message || "❌ Booking failed!");
    }
  };

  const resetForm = () => {
    setDate("");
    setStartTime("");
    setEndTime("");
    setNote("");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-white text-xl">
      Loading room details...
    </div>
  );

  if (!room) return (
    <div className="min-h-screen flex items-center justify-center text-white text-xl">
      Room not found
    </div>
  );

  const isOwner = user && room.owner?._id === user._id;

  return (
    <div className="min-h-screen bg-[#050816] text-white py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-4xl shadow-2xl overflow-hidden">
        
        <div className="w-full h-80 overflow-hidden">
          <img
            src={room.image || "https://via.placeholder.com/800x400"}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3">{room.name}</h1>
            <p className="text-gray-300 text-lg">{room.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-gray-400 text-sm">Floor</p>
              <p className="text-xl font-bold">{room.floor}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-gray-400 text-sm">Capacity</p>
              <p className="text-xl font-bold">{room.capacity} people</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-gray-400 text-sm">Price</p>
              <p className="text-xl font-bold text-blue-400">${room.hourlyRate}/hr</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <p className="text-gray-400 text-sm">Booked</p>
              <p className="text-xl font-bold">{room.bookingCount || 0} times</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Amenities</h3>
            <div className="flex flex-wrap gap-3">
              {room.amenities?.map((item) => (
                <span key={item} className="bg-white/10 text-white px-4 py-2 rounded-full text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <h3 className="text-xl font-semibold mb-4">Hosted by</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                {room.owner?.name?.charAt(0).toUpperCase() || "O"}
              </div>
              <div>
                <h4 className="text-xl font-bold">{room.owner?.name || "Unknown Owner"}</h4>
                <p className="text-gray-400">{room.owner?.email || "No email provided"}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            {user ? (
              <button
                onClick={() => setShowBookingModal(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-semibold transition-all"
              >
                Book Now
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl font-semibold transition-all"
              >
                Login to Book
              </button>
            )}

            {isOwner && (
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate(`/edit-room/${id}`)}
                  className="bg-yellow-500 hover:bg-yellow-400 text-white px-6 py-3 rounded-2xl font-medium"
                >
                  Edit Room
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-2xl font-medium"
                >
                  Delete Room
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showBookingModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0b1023] border border-white/10 p-6 rounded-3xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Book This Room</h2>

            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/5 border border-white/10 text-white p-3 w-full rounded-xl mb-3 outline-none focus:border-blue-400"
            />

            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="bg-white/5 border border-white/10 text-white p-3 w-full rounded-xl mb-3 outline-none focus:border-blue-400"
            >
              <option value="">Select Start Time</option>
              {timeSlots.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="bg-white/5 border border-white/10 text-white p-3 w-full rounded-xl mb-3 outline-none focus:border-blue-400"
            >
              <option value="">Select End Time</option>
              {timeSlots.filter(t => t > startTime).map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <div className="text-xl font-bold text-blue-400 mb-4 text-center">
              Total: ${totalCost}
            </div>

            <textarea
              placeholder="Add a note (optional)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-white/5 border border-white/10 text-white p-3 w-full rounded-xl mb-4 outline-none focus:border-blue-400"
              rows="2"
            />

            <div className="flex gap-3">
              <button
                onClick={handleBookNow}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-3 rounded-xl flex-1 font-medium"
              >
                Confirm Booking
              </button>
              <button
                onClick={async () => {
                  setShowBookingModal(false);
                  const res = await api.get(`/rooms/${id}`);
                  setRoom(res.data);
                }}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}