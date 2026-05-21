/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function MyListings() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyRooms = async () => {
      if (!user) return;

      try {
        const res = await api.get("/rooms/my/listings");
        setRooms(res.data);
      } catch (err) {
        toast.error("Failed to load your rooms");
      } finally {
        setLoading(false);
      }
    };

    fetchMyRooms();
  }, [user]);

  // ✅ DELETE with TOAST (NO alert)
  const deleteRoom = async (id) => {
    try {
      await api.delete(`/rooms/${id}`);
      setRooms(rooms.filter((room) => room._id !== id));
      toast.success("Room deleted successfully!");
    } catch (err) {
      toast.error("Delete failed!");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white text-xl">
        Loading your listings...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-10 text-center md:text-left">
          My Room Listings
        </h1>

        {rooms.length === 0 ? (
          <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-10 text-center">
            <p className="text-gray-300 text-lg">No rooms added yet.</p>
            <button
              onClick={() => navigate("/add-room")}
              className="mt-4 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Add New Room
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <div
                key={room._id}
                className="bg-[#1e293b] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition"
              >
                {/* Room Image */}
                <img
                  src={room.image || "https://via.placeholder.com/400"}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {room.name}
                  </h3>
                  <p className="text-blue-400 font-semibold mb-1">
                    ${room.hourlyRate}/hour
                  </p>
                  <p className="text-gray-400 text-sm mb-4">Floor: {room.floor}</p>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/edit-room/${room._id}`)}
                      className="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white py-2 rounded-xl transition text-center"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteRoom(room._id)}
                      className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-xl transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}