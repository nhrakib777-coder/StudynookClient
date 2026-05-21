/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await api.get("/rooms?limit=8&sort=createdAt");
        setRooms(res.data);
      } catch (err) {
        console.error("Failed to load rooms");
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Student",
      text: "Best platform for booking quiet study rooms. Super smooth and reliable!",
      img: "https://picsum.photos/id/64/200/200",
    },
    {
      name: "Sarah Lee",
      role: "Medical Student",
      text: "Clean rooms, friendly hosts, and easy booking. I use it every week!",
      img: "https://picsum.photos/id/65/200/200",
    },
    {
      name: "Michael Chen",
      role: "Engineer",
      text: "Flexible timing and affordable prices make this my top choice.",
      img: "https://picsum.photos/id/91/200/200",
    },
    {
      name: "Priya Patel",
      role: "Law Student",
      text: "Peaceful rooms and excellent experience every time.",
      img: "https://picsum.photos/id/84/200/200",
    },
  ];

  const heroSlides = [
    {
      badge: "Premium Study Experience",
      title1: "Quiet Spaces",
      title2: "Built For",
      title3: "Deep Focus",
      subtitle:
        "Discover beautifully designed private study rooms with peaceful environments and seamless booking.",
      image:
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop",
    },
    {
      badge: "Modern Learning Environment",
      title1: "Modern Rooms",
      title2: "Designed For",
      title3: "Productivity",
      subtitle:
        "Premium study environments with comfort and flexibility.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop",
    },
    {
      badge: "Flexible Booking System",
      title1: "Study Smarter",
      title2: "Anytime",
      title3: "Anywhere",
      subtitle:
        "Book instantly and enjoy quiet learning spaces wherever you are.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050816] text-white overflow-x-hidden">

      {/* ================= HERO ================= */}
      <Swiper
        modules={[Autoplay, Pagination, A11y]}
        slidesPerView={1}
        loop
        speed={900}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="h-svh w-full"
      >
        {heroSlides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative h-svh w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/70" />
              <div className="absolute inset-0 bg-linear-to-r from-[#050816] via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.35),transparent_45%)]" />

              {/* CONTENT */}
              <div className="relative z-10 flex items-center h-full px-6 sm:px-12 lg:px-20">
                <div className="max-w-3xl text-left">

                  <span className="inline-block px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-[10px] sm:text-xs uppercase tracking-[3px] mb-6">
                    {slide.badge}
                  </span>

                  <h1 className="text-[clamp(2.5rem,5vw,4.8rem)] font-bold leading-[1.05] mb-6">
                    <span className="block text-emerald-400">{slide.title1}</span>
                    <span className="text-emerald-400">{slide.title2} </span>
                    <span className="text-blue-400">{slide.title3}</span>
                  </h1>

                  <p className="text-white/80 text-base sm:text-lg mb-8 max-w-xl">
                    {slide.subtitle}
                  </p>

                  <div className="flex gap-4 flex-wrap">
                    <Link
                      to="/rooms"
                      className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-semibold transition"
                    >
                      Explore Rooms
                    </Link>

                    <Link
                      to="/register"
                      className="bg-white/10 hover:bg-white/15 border border-white/20 px-8 py-3 rounded-xl font-semibold transition"
                    >
                      Join Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= ROOMS ================= */}
      <section className="py-24 px-6">
        <div className="text-center mb-14">
          <p className="text-blue-400 uppercase tracking-[3px] text-xs mb-3">
            Featured Spaces
          </p>
          <h2 className="text-4xl font-bold text-emerald-400 mb-3">
            Popular Study Rooms
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Premium quiet spaces built for productivity.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Swiper
            modules={[Autoplay, Pagination, A11y]}
            slidesPerView={1}
            spaceBetween={24}
            loop
            speed={800}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
          >
            {rooms.map((room) => (
              <SwiperSlide key={room._id}>
                <PremiumRoomCard room={room} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>

      {/* ================= WHY ================= */}
      <section className="py-24 px-6 bg-[#0b1023]">
        <div className="text-center mb-14">
          <p className="text-emerald-400 uppercase tracking-[3px] text-xs mb-3">
            Why Us
          </p>
          <h2 className="text-4xl font-bold mb-3">
            Why Choose StudyNook
          </h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Built for focused learners who need quiet environments.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            ["Affordable", "Budget-friendly pricing with no hidden charges."],
            ["Peaceful", "Quiet environments built for concentration."],
            ["Flexible", "Instant booking anytime with seamless scheduling."],
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 border border-white/15 backdrop-blur-2xl rounded-3xl p-8 text-center"
            >
              <h3 className="text-xl font-bold mb-3">{item[0]}</h3>
              <p className="text-white/70 text-sm">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 px-6">
        <div className="text-center mb-14">
          <p className="text-indigo-400 uppercase tracking-[3px] text-xs mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl font-bold mb-3">What Users Say</h2>
          <p className="text-white/70 max-w-xl mx-auto">
            Trusted by students and professionals nationwide.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination, A11y]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          speed={800}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white/10 border border-white/15 backdrop-blur-2xl rounded-3xl p-6 h-full flex flex-col">
                <p className="text-white/80 mb-6">“{t.text}”</p>

                <div className="mt-auto flex items-center gap-3">
                  <img
                    src={t.img}
                    className="w-12 h-12 rounded-full border border-white/20"
                  />
                  <div>
                    <h4 className="font-semibold">{t.name}</h4>
                    <p className="text-xs text-white/60">{t.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center bg-linear-to-r from-blue-600/20 to-indigo-600/20 border border-white/15 backdrop-blur-2xl rounded-3xl p-10">
          <h2 className="text-4xl font-bold mb-4">Ready To Start?</h2>
          <p className="text-white/70 mb-8">
            Join thousands of students using StudyNook.
          </p>

          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-semibold"
          >
            Create Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}

/* ================= ROOM CARD ================= */
function PremiumRoomCard({ room }) {
  return (
    <div className="bg-white/10 border border-white/15 backdrop-blur-2xl rounded-3xl overflow-hidden flex flex-col h-full">
      <img
        src={room.image}
        className="h-52 w-full object-cover"
        alt={room.name}
      />

      <div className="p-6 flex flex-col flex-1 text-center">
        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
        <p className="text-white/70 text-sm mb-4">
          {room.description?.slice(0, 90)}...
        </p>

        <p className="text-blue-400 font-bold text-xl mb-4">
          ${room.hourlyRate}/hr
        </p>

        <Link
          to={`/room/${room._id}`}
          className="mt-auto bg-blue-600 hover:bg-blue-500 py-2.5 rounded-xl font-semibold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}