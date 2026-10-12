
import { useRef, useState } from "react";
import useFetchData from "../hooks/useFetchData";

export default function Guests() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  const fileInputRef = useRef(null);
  const [photo, setPhoto] = useState("");

  function handlePhoto(event) {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("Please select an image smaller than 2 MB.");
        return;
      }

      setPhoto(URL.createObjectURL(file));
    }
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">GUEST DIRECTORY</p>
          <h1>Guests</h1>
          <p className="muted">View sample guest records from an API.</p>
        </div>
      </div>

      <section className="panel upload-panel">
        <h2>Guest Profile Photo</h2>

        {photo && <img className="profile-preview" src={photo} alt="Guest preview" />}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handlePhoto}
        />

        <button
          className="primary-btn"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload Photo
        </button>
      </section>

      <section className="panel">
        <h2>Guest Records</h2>

        {loading && <p>Loading guests...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {data.map((guest) => (
                  <tr key={guest.id}>
                    <td>{guest.id}</td>
                    <td>{guest.name}</td>
                    <td>{guest.email}</td>
                    <td>{guest.phone}</td>
                    <td>{guest.company.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
