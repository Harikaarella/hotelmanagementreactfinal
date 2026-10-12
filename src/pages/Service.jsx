
import { NavLink, Outlet } from "react-router-dom";

export default function Services() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">GUEST EXPERIENCE</p>
          <h1>Hotel Services</h1>
          <p className="muted">
            Explore the facilities available to our guests.
          </p>
        </div>
      </div>

      <div className="service-tabs">
        <NavLink end to="/services">Overview</NavLink>
        <NavLink to="/services/restaurant">Restaurant</NavLink>
        <NavLink to="/services/spa">Spa & Wellness</NavLink>
        <NavLink to="/services/airport">Airport Pickup</NavLink>
      </div>

      <Outlet />
    </div>
  );
}
