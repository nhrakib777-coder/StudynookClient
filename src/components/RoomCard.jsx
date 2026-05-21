import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  return (
    <div className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
      {/* IMAGE WITH PREMIUM HOVER ZOOM */}
      <div className="w-full h-52 overflow-hidden">
        <img
          src={room.image || "https://via.placeholder.com/400x200"}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* CARD CONTENT */}
      <div className="p-6 space-y-4">
        {/* TITLE */}
        <h3 className="text-xl font-bold text-white leading-tight">{room.name}</h3>
        
        {/* DESCRIPTION */}
        <p className="text-gray-300 text-sm line-clamp-2">{room.description}</p>

        {/* INFO ROWS */}
        <div className="space-y-2 text-sm text-gray-200">
          <p>📍 Floor: {room.floor}</p>
          <p>👥 Capacity: {room.capacity} people</p>
          <p className="text-blue-400 font-bold text-lg">${room.hourlyRate}/hr</p>
        </div>

        {/* AMENITIES */}
        <div className="flex flex-wrap gap-2">
          {room.amenities?.slice(0, 3).map((item) => (
            <span
              key={item}
              className="bg-white/10 text-white px-3 py-1 rounded-full text-xs"
            >
              {item}
            </span>
          ))}
          {room.amenities?.length > 3 && (
            <span className="text-gray-400 text-xs">+{room.amenities.length - 3} more</span>
          )}
        </div>

        {/* PREMIUM BUTTON */}
        <Link
          to={`/room/${room._id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-2xl font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}