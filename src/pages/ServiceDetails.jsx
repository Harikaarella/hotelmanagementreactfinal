
import { useParams } from "react-router-dom";

const services = {
  restaurant: {
    title: "Restaurant & Dining",
    icon: "🍽️",
    description:
      "Enjoy fresh meals, breakfast, lunch and dinner prepared by our culinary team.",
    hours: "7:00 AM – 10:00 PM",
  },
  spa: {
    title: "Spa & Wellness",
    icon: "🧖",
    description:
      "Relax with wellness treatments and a peaceful atmosphere during your stay.",
    hours: "9:00 AM – 8:00 PM",
  },
  airport: {
    title: "Airport Pickup",
    icon: "🚘",
    description:
      "Arrange a convenient airport transfer with our front desk team.",
    hours: "Advance booking required",
  },
};

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const service = services[serviceId];

  if (!service) {
    return (
      <section className="panel">
        <h2>Welcome to our services</h2>
        <p>Choose a service above to see its details.</p>
      </section>
    );
  }

  return (
    <section className="panel service-detail">
      <div className="service-icon">{service.icon}</div>
      <p className="eyebrow">HOTEL FACILITIES</p>
      <h2>{service.title}</h2>
      <p>{service.description}</p>
      <p><strong>Availability:</strong> {service.hours}</p>
      <p className="muted">
        Contact the reception desk for reservations and additional information.
      </p>
    </section>
  );
}
