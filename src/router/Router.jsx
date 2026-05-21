// src/router/Router.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Rooms from "../pages/Rooms";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../components/PrivateRoute";
import AddRoom from "../pages/AddRoom";
import MyListings from "../pages/MyListings";
import MyBookings from "../pages/MyBookings";
import RoomDetails from "../pages/RoomDetails";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditRoom from "../pages/EditRoom";
export default function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        
        {/* Private Routes */}
        <Route path="/add-room" element={<PrivateRoute><AddRoom /></PrivateRoute>} />
        <Route path="/my-listings" element={<PrivateRoute><MyListings /></PrivateRoute>} />
        <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
        <Route path="/edit-room/:id" element={<PrivateRoute><EditRoom /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}