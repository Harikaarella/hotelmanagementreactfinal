
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function BookingDetails() {
  const { id } = useParams();

  const booking = useSelector((state) =>
    state.booking.bookings.find((item) => item.id === Number(id))
  );

  if (!booking) {
    return (
      <div className="panel">
        <h2>Booking not found</h2>
        <Link to="/bookings">Return to bookings</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">RESERVATION DETAILS</p>
          <h1>Booking #{booking.id}</h1>
        </div>
        <Link className="secondary-btn" to="/bookings">Back</Link>
      </div>

      <section className="panel details-panel">
        <h2>{booking.guest}</h2>
        <p><strong>Room:</strong> {booking.room}</p>
        <p><strong>Room number:</strong> {booking.roomNo}</p>
        <p><strong>Check-in:</strong> {booking.checkIn || "Not set"}</p>
        <p><strong>Check-out:</strong> {booking.checkOut || "Not set"}</p>
        <p><strong>Guests:</strong> {booking.guests}</p>
        <p><strong>Status:</strong> {booking.status}</p>
        <p><strong>Total amount:</strong> ₹{Number(booking.amount).toLocaleString("en-IN")}</p>
      </section>
    </div>
  );
}
