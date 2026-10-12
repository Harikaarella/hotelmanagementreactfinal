
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import RoomCard from "../components/RoomCard";

const rooms = [
  {
    id: 1,
    name: "Classic Room",
    type: "STANDARD",
    price: 2500,
    capacity: 2,
    beds: "1 Queen",
    available: true,
    description: "A comfortable room for a relaxing stay.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Deluxe Room",
    type: "DELUXE",
    price: 4000,
    capacity: 2,
    beds: "1 King",
    available: true,
    description: "Elegant interiors with premium comfort.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Family Room",
    type: "FAMILY",
    price: 5500,
    capacity: 4,
    beds: "2 Queen",
    available: false,
    description: "Spacious accommodation for families.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Luxury Suite",
    type: "SUITE",
    price: 8500,
    capacity: 3,
    beds: "1 King",
    available: true,
    description: "A sophisticated suite with extra space.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Rooms() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [type, setType] = useState(searchParams.get("type") || "All");

  const filteredRooms = rooms.filter((room) => {
    const matchesName = room.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "All" || room.type === type;
    return matchesName && matchesType;
  });

  function updateFilters(nextSearch, nextType) {
    const params = {};
    if (nextSearch) params.search = nextSearch;
    if (nextType !== "All") params.type = nextType;
    setSearchParams(params);
  }

  function handleBook(room) {
    navigate("/bookings", {
      state: {
        roomName: room.name,
        roomNo: String(100 + room.id),
        amount: room.price,
      },
    });
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">ACCOMMODATION</p>
          <h1>Our Rooms</h1>
          <p className="muted">Find the perfect room for your guests.</p>
        </div>
      </div>

      <div className="filters">
        <input
          value={search}
          placeholder="Search rooms..."
          onChange={(e) => {
            setSearch(e.target.value);
            updateFilters(e.target.value, type);
          }}
        />

        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            updateFilters(search, e.target.value);
          }}
        >
          <option value="All">All room types</option>
          <option value="STANDARD">Standard</option>
          <option value="DELUXE">Deluxe</option>
          <option value="FAMILY">Family</option>
          <option value="SUITE">Suite</option>
        </select>
      </div>

      <div className="rooms-grid">
        {filteredRooms.map((room) => (
          <RoomCard key={room.id} room={room} onBook={handleBook} />
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <div className="empty-state">No rooms match your search.</div>
      )}
    </div>
  );
}
