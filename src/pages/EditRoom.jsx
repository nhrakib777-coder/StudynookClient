/* eslint-disable no-unused-vars */
// src/pages/EditRoom.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const amenityOptions = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    floor: "",
    capacity: "",
    hourlyRate: "",
    amenities: [],
  });

  useEffect(() => {
    const getRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setForm(res.data);
      } catch (err) {
        toast.error("Failed to load room");
      }
    };
    getRoom();
  }, [id]);

  const toggleAmenity = (item) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(item)
        ? prev.amenities.filter((i) => i !== item)
        : [...prev.amenities, item],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.put(`/rooms/${id}`, form);
      toast.success("Room updated successfully!");
      navigate("/my-listings");
    } catch (err) {
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-14 px-4">
      <div className="max-w-2xl mx-auto bg-[#1e293b] border border-white/10 rounded-3xl p-8 shadow-2xl">
        
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Edit Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Name */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Room Name</label>
            <input
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all"
              placeholder="Room Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Description</label>
            <textarea
              rows={3}
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all resize-none"
              placeholder="Description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Image URL</label>
            <input
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          {/* Floor & Capacity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Floor</label>
              <input
                className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all"
                placeholder="Floor"
                required
                value={form.floor}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">Capacity</label>
              <input
                type="number"
                className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all"
                placeholder="Capacity"
                required
                value={form.capacity}
                onChange={(e) => setForm({ ...form, capacity: e.target.value })}
              />
            </div>
          </div>

          {/* Hourly Rate */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Hourly Rate ($)</label>
            <input
              type="number"
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all"
              placeholder="Hourly Rate"
              required
              value={form.hourlyRate}
              onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="text-gray-300 text-sm mb-3 block">Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenityOptions.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 bg-[#161e38] px-3 py-2.5 rounded-lg border border-white/10 cursor-pointer hover:border-blue-500 transition"
                >
                  <input
                    type="checkbox"
                    checked={form.amenities?.includes(item)}
                    onChange={() => toggleAmenity(item)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-white text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-blue-600 to-blue-500 hover:to-blue-400 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-blue-600/20"
          >
            {loading ? "Updating..." : "Update Room"}
          </button>
        </form>
      </div>
    </div>
  );
}