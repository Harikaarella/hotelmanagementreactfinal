
import { useHotel } from "../context/HotelContext";

export default function Navbar() {
  const { state, dispatch } = useHotel();

  return (
    <header className="navbar">
      <div>
        <h2>{state.hotelName}</h2>
        <p>Hotel Management Dashboard</p>
      </div>

      <button
        className="theme-btn"
        onClick={() => dispatch({ type: "TOGGLE_THEME" })}
      >
        {state.darkMode ? "☀ Light Mode" : "☾ Dark Mode"}
      </button>
    </header>
  );
}
