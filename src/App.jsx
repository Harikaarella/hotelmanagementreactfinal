import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";

import { store } from "./redux/store";
import { HotelProvider} from "./context/HotelContext"

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import RoomCard from "./components/RoomCard";

import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import Guests from "./pages/Guest";
import Services from "./pages/Service";
import ServiceDetails from "./pages/ServiceDetails";
import About from "./pages/About";
import Contact from "./pages/contact";


import "./App.css";

function Layout() {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/guests" element={<Guests />} />

            <Route path="/services" element={<Services />}>
              <Route index element={<ServiceDetails />} />
              <Route
                path=":serviceId"
                element={<ServiceDetails />}
              />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <footer className="footer">
            © 2026 Grand Horizon Hotel · React Training Project
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
  <HotelProvider>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </HotelProvider>
</Provider>
  );
}
