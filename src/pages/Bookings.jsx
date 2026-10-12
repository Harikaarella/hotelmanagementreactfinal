
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  addBooking,
  updateBooking,
  deleteBooking,
} from "../redux/bookingSlice";

const emptyForm = {
  guest: "",
  email: "",
  room: "Deluxe Room",
  roomNo: "101",
  checkIn: "",
  checkOut: "",
  guests: 1,
  status: "Confirmed",
  amount: 4000,
};

export default function Bookings() {
  const bookings = useSelector((state) => state.booking.bookings);
  const dispatch = useDispatch();
  const location = useLocation();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (location.state?.roomName) {
      setForm((current) => ({
        ...current,
        room: location.state.roomName,
        roomNo: location.state.roomNo,
        amount: location.state.amount,
      }));

      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((current) => ({
      ...current,
      [name]: name === "amount" || name === "guests"
        ? Number(value)
        : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!form.guest.trim() || !form.email.trim()) {
      setMessage("Please enter the guest name and email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!form.checkIn || !form.checkOut || form.checkOut <= form.checkIn) {
      setMessage("Check-out must be after check-in.");
      return;
    }

    if (form.guests < 1 || form.amount < 0) {
      setMessage("Enter valid guest and amount values.");
      return;
    }

    if (editingId !== null) {
      dispatch(updateBooking({ ...form, id: editingId }));
      setMessage("Booking updated successfully.");
    } else {
      dispatch(addBooking(form));
      setMessage("Booking created successfully.");
    }

    setForm(emptyForm);
    setEditingId(null);
  }

  function handleEdit(booking) {
    setForm({
      ...emptyForm,
      ...booking,
      email: booking.email || "",
    });
    setEditingId(booking.id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      dispatch(deleteBooking(id));
      if (editingId === id) {
        setEditingId(null);
        setForm(emptyForm);
      }
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">RESERVATIONS</p>
          <h1>Manage Bookings</h1>
          <p className="muted">Create and manage guest reservations.</p>
        </div>
      </div>

      <section className="panel form-panel">
        <h2>{editingId !== null ? "Edit Booking" : "Create a Booking"}</h2>

        <form onSubmit={handleSubmit} className="booking-form">
          <label>
            Guest Name
            <input
              name="guest"
              value={form.guest}
              onChange={handleChange}
              placeholder="Enter guest name"
              required
            />
          </label>

          <label>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="guest@example.com"
              required
            />
          </label>

          <label>
            Room Type
            <select name="room" value={form.room} onChange={handleChange}>
              <option>Classic Room</option>
              <option>Deluxe Room</option>
              <option>Family Room</option>
              <option>Luxury Suite</option>
            </select>
          </label>

          <label>
            Room Number
            <input
              name="roomNo"
              value={form.roomNo}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Check-in
            <input
              name="checkIn"
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={form.checkIn}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Check-out
            <input
              name="checkOut"
              type="date"
              min={form.checkIn || new Date().toLocaleDateString("en-CA")}
              value={form.checkOut}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Number of Guests
            <input
              name="guests"
              type="number"
              min="1"
              max="10"
              value={form.guests}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Amount (₹)
            <input
              name="amount"
              type="number"
              min="0"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Status
            <select name="status" value={form.status} onChange={handleChange}>
              <option>Confirmed</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
          </label>

          <div className="form-actions">
            <button className="primary-btn" type="submit">
              {editingId !== null ? "Save Changes" : "Create Booking"}
            </button>

            {editingId !== null && (
              <button
                className="secondary-btn"
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                  setMessage("");
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {message && <p className="form-message" role="status">{message}</p>}
      </section>

      <section className="panel">
        <h2>All Bookings ({bookings.length})</h2>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Guest</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <Link to={`/bookings/${booking.id}`}>
                      {booking.guest}
                    </Link>
                  </td>
                  <td>{booking.roomNo} · {booking.room}</td>
                  <td>{booking.checkIn} to {booking.checkOut}</td>
                  <td>
                    <span className={`badge ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>₹{Number(booking.amount).toLocaleString("en-IN")}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="small-btn" onClick={() => handleEdit(booking)}>
                        Edit
                      </button>
                      <button
                        className="small-btn delete-btn"
                        onClick={() => handleDelete(booking.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {bookings.length === 0 && (
                <tr>
                  <td colSpan="6">No bookings available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
