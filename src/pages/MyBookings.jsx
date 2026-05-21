/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (err) {
        toast.error("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, []);

  const handleCancelClick = (id) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const confirmCancel = async () => {
    try {
      await api.patch(`/bookings/${selectedId}/cancel`);
      toast.success("Booking cancelled successfully");

      // refresh
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      toast.error("Cancellation failed");
    } finally {
      setModalOpen(false);
      setSelectedId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] py-14 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-10 text-center">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-300 text-lg">You have no bookings yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
              >
                <img
                  src={b.room.image || "https://via.placeholder.com/400"}
                  alt={b.room.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2">
                    {b.room.name}
                  </h2>

                  <div className="space-y-2 text-gray-300 text-sm">
                    <p>📅 Date: {b.date}</p>
                    <p>⏰ Time: {b.startTime} – {b.endTime}</p>
                    <p>💰 Total: ${b.totalPrice}</p>
                    <p>📝 Note: {b.note || "No note"}</p>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        b.status === "confirmed"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {b.status === "confirmed" && (
                    <button
                      onClick={() => handleCancelClick(b._id)}
                      className="mt-5 w-full bg-red-600 hover:bg-red-500 text-white py-2.5 rounded-xl transition"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <ConfirmModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={confirmCancel}
          title="Cancel Booking"
          message="Are you sure you want to cancel this booking? This cannot be undone."
          confirmText="Yes, Cancel"
          cancelText="No, Go Back"
          confirmColor="bg-red-600 hover:bg-red-500"
        />
      </div>
    </div>
  );
}