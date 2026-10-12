
export default function RoomCard({ room, onBook }) {
  return (
    <article className="room-card">
      <div className="room-image">
        <img src={room.image} alt={room.name} />
        <span
          className={
            room.available ? "status available" : "status unavailable"
          }
        >
          {room.available ? "Available" : "Occupied"}
        </span>
      </div>

      <div className="room-content">
        <p className="room-type">{room.type}</p>
        <h3>{room.name}</h3>
        <p className="muted">{room.description}</p>
        <p>👥 {room.capacity} Guests · 🛏 {room.beds}</p>

        <div className="room-bottom">
          <p>
            <strong>₹{room.price.toLocaleString("en-IN")}</strong>
            <span className="muted"> / night</span>
          </p>

          <button
            disabled={!room.available}
            onClick={() => onBook(room)}
          >
            {room.available ? "Book Now" : "Occupied"}
          </button>
        </div>
      </div>
    </article>
  );
}
