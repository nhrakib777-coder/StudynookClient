import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h2 className="text-3xl font-bold text-cyan-400 mb-3">StudyNook</h2>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm">
              Book quiet, comfortable study rooms effortlessly.
              Your perfect study space is just a click away.
            </p>
          </div>

          {/* Quick Links (for professionalism) */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-cyan-400 transition cursor-pointer">Home</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Browse Rooms</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">My Bookings</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Add Room</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-cyan-400 transition cursor-pointer">Contact Us</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">FAQs</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Terms of Service</li>
              <li className="hover:text-cyan-400 transition cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8" />

        {/* Social & Copyright Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Social Icons */}
          <div className="flex gap-5 text-xl text-gray-400">
            <a href="#" className="hover:text-cyan-400 transition">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-cyan-400 transition">
              <FaXTwitter />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm text-center md:text-right">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;