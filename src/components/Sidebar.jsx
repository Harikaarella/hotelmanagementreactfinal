
import { NavLink } from "react-router-dom";

const menus = [
  { path: "/", label: "Dashboard", icon: "▦" },
  { path: "/rooms", label: "Rooms", icon: "🛏" },
  { path: "/bookings", label: "Bookings", icon: "📅" },
  { path: "/guests", label: "Guests", icon: "♙" },
  { path: "/services", label: "Services", icon: "✦" },
  { path: "/about", label: "About", icon: "ⓘ" },
  { path: "/contact", label: "Contact", icon: "✉" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="menu-title">MAIN MENU</p>

      <nav>
        {menus.map((menu) => (
          <NavLink
            key={menu.path}
            to={menu.path}
            end={menu.path === "/"}
            className={({ isActive }) =>
              isActive ? "menu-link active" : "menu-link"
            }
          >
            <span>{menu.icon}</span>
            {menu.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>Grand Horizon</p>
        <small>Your stay, our priority.</small>
      </div>
    </aside>
  );
}
