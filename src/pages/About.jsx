
export default function About() {
  return (
    <div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">OUR STORY</p>
          <h1>About Grand Horizon</h1>
          <p className="muted">Comfort, hospitality and memorable stays.</p>
        </div>
      </div>

      <section className="panel about-panel">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
          alt="Hotel swimming pool and property"
        />
        <h2>Hospitality that feels like home</h2>
        <p>
          Grand Horizon is a sample hotel brand created for this React
          training project. Our concept focuses on comfortable rooms,
          welcoming service and convenient guest facilities.
        </p>
        <div className="stats-grid">
          <div className="stat-card"><h2>48</h2><p>Sample Rooms</p></div>
          <div className="stat-card"><h2>24/7</h2><p>Guest Support</p></div>
          <div className="stat-card"><h2>3</h2><p>Dining & Wellness Services</p></div>
        </div>
      </section>
    </div>
  );
}
