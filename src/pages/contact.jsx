
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">GET IN TOUCH</p>
          <h1>Contact Us</h1>
          <p className="muted">We're happy to answer your questions.</p>
        </div>
      </div>

      <div className="contact-grid">
        <section className="panel">
          <h2>Reception</h2>
          <p>📍 Hyderabad, Telangana, India</p>
          <p>✉ reception@grandhorizon.example</p>
          <p>☎ +91 9398340345</p>
          <p className="muted">
            Sample contact details for the academic project. No real
            reservation service is connected.
          </p>
        </section>

        <section className="panel">
          <h2>Send an Enquiry</h2>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name"
              />
            </label>

            <label>
              Email
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Your email"
              />
            </label>

            <label>
              Message
              <textarea
                required
                rows="4"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How can we help?"
              />
            </label>

            <button className="primary-btn" type="submit">Send Enquiry</button>
          </form>

          {submitted && (
            <p className="form-message" role="status">
              Enquiry recorded in this demo. No message was sent to a server.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
