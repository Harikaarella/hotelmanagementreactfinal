
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const bookings = useSelector((state) => state.booking.bookings);

  const totalRevenue = bookings.reduce(
    (total, booking) => total + Number(booking.amount || 0),
    0
  );

  const stats = [
    { title: "Total Rooms", value: 48, icon: "🛏" },
    { title: "Total Bookings", value: bookings.length, icon: "📅" },
    {
      title: "Confirmed",
      value: bookings.filter((b) => b.status === "Confirmed").length,
      icon: "✓",
    },
    {
      title: "Booking Value",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: "₹",
    },
  ];

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="muted">Welcome back! Here's your hotel overview.</p>
        </div>

        <Link className="primary-btn" to="/bookings">
          + New Booking
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.title}>
            <div className="stat-icon">{stat.icon}</div>
            <p className="muted">{stat.title}</p>
            <h2>{stat.value}</h2>
          </div>
        ))}
      </div>

      <section className="panel">
        <div className="section-heading">
          <div>
            <h2>Recent Bookings</h2>
            <p className="muted">Your latest reservations</p>
          </div>
          <Link to="/bookings">View All →</Link>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-in</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {bookings.slice(-5).reverse().map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <Link to={`/bookings/${booking.id}`}>
                      {booking.guest}
                    </Link>
                  </td>
                  <td>{booking.roomNo}</td>
                  <td>{booking.checkIn}</td>
                  <td>
                    <span className={`badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>₹{Number(booking.amount).toLocaleString("en-IN")}</td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td colSpan="5">No bookings yet. Create your first booking.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
