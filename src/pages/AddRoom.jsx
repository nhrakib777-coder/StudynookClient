/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

export default function AddRoom() {
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
      await api.post("/rooms", form);
      toast.success("Room added successfully!");
      navigate("/my-listings");
    } catch (err) {
      toast.error("Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b1a] py-14 px-4">
      <div className="max-w-2xl mx-auto bg-[#0f162c] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h2 className="text-[26px] font-bold text-white text-center mb-8">
          Add New Study Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Room Name */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Room Name</label>
            <input
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all duration-200"
              placeholder="Enter room name"
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
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all duration-200 resize-none"
              placeholder="Write room description"
              required
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Image URL</label>
            <input
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all duration-200"
              placeholder="Paste image link here"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>

          {/* Two Column Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-gray-300 text-sm mb-2 block">Floor Number</label>
              <input
                className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all duration-200"
                placeholder="e.g 2nd Floor"
                required
                value={form.floor}
                onChange={(e) => setForm({ ...form, floor: e.target.value })}
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm mb-2 block">People Capacity</label>
              <input
                type="number"
                className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all duration-200"
                placeholder="Max people"
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
              className="w-full bg-[#161e38] border border-white/15 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500 transition-all duration-200"
              placeholder="Enter price per hour"
              required
              value={form.hourlyRate}
              onChange={(e) => setForm({ ...form, hourlyRate: e.target.value })}
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="text-gray-300 text-sm mb-3 block">Select Amenities</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenityOptions.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2.5 bg-[#161e38] px-3 py-2.5 rounded-lg border border-white/10 cursor-pointer hover:border-blue-500 transition"
                >
                  <input
                    type="checkbox"
                    checked={form.amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-white text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-linear-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-blue-600/20"
          >
            {loading ? "Adding Room..." : "Publish Room"}
          </button>
        </form>
      </div>
    </div>
  );
}