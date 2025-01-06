import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { tours } from "../../assets/data/tours";
import "./TourDetails.scss";

// --- Smaller Components ---

// Displays the tour image
function TourImage({ imageKey, title }) {
  return (
    <div className="tour-image">
      <img src={imageKey} alt={title} />
    </div>
  );
}

// Displays the tour header (title and description)
function TourHeader({ title, description }) {
  return (
    <div className="tour-header reveal">
      <h3 className="tour-title">{title}</h3>
      <p className="tour-details-description">{description}</p>
    </div>
  );
}

// Displays a generic list (used for itinerary, activities, inclusions, etc.)
function ListSection({ title, items }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="reveal">
      <h3>{title}:</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// Displays a single FAQ item
function FaqItem({ faq }) {
  return (
    <li>
      <div>
        <b>Q:</b> {faq.question}
        <br />
        <b>A:</b> {faq.answer}
      </div>
    </li>
  );
}

// Displays the list of FAQs
function FaqList({ faqs }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="reveal">
      <h3>FAQs:</h3>
      <ul>
        {faqs.map((faq, index) => (
          <FaqItem key={index} faq={faq} />
        ))}
      </ul>
    </div>
  );
}

// --- Main TourDetails Component ---

export default function TourDetails() {
  const { id } = useParams();

  // Find the tour from the tours array (no API call)
  const tour = tours.find((tour) => tour.id === id);

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll(".reveal");
      const windowHeight = window.innerHeight;
      const elementVisible = 150;

      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("active");
        } else {
          element.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", reveal);
    reveal();

    return () => {
      window.removeEventListener("scroll", reveal);
    };
  }, []);

  if (!tour) {
    return (
      <div className="tour-not-found">
        <h2>Tour not found</h2>
        <p>
          We couldn't find a tour with the ID: {id}. Please check the URL or
          browse our other exciting tours below:
        </p>

        <ul>
          {tours.slice(0, 3).map((otherTour) => (
            <li key={otherTour.id}>
              <Link to={`/tours/${otherTour.id}`}>{otherTour.title}</Link>
            </li>
          ))}
        </ul>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <section className="tour-details">
      <TourImage imageKey={tour.imageKey} title={tour.title} />
      <article className="tour-info">
        <TourHeader title={tour.title} description={tour.description} />

        <ListSection title="Itinerary" items={tour.itinerary} />
        <ListSection title="Activities" items={tour.activities} />
        <ListSection title="Inclusions" items={tour.inclusions} />
        <ListSection title="What to Bring" items={tour.whatToBring} />
        <FaqList faqs={tour.FAQs} />

        <p className="tour-duration reveal">
          <b>Duration:</b> {tour.duration}
        </p>
        <p className="tour-price reveal">
          <b>Price:</b> From ${tour.price} / person
        </p>

        {/* --- Book Now Button --- */}
        <div className="book-now-button reveal">
          <Link to="/booking">Book Now</Link>
        </div>
      </article>
    </section>
  );
}