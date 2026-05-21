// src/pages/Rooms.jsx
import { useEffect, useState } from "react";
import api from "../services/api";
import RoomCard from "../components/RoomCard";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">All Study Rooms</h2>

      {loading ? (
        <LoadingSpinner />
      ) : rooms.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No rooms found</p>
      ) : (
        <div className="grid grid-cols-1 sm:cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room._id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}