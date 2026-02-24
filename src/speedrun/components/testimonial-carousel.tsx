import { useState } from "react";
import "./testimonial-carousel.css";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`testimonial-track ${isPaused ? "paused" : ""}`}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <blockquote className="testimonial-quote">
              "{testimonial.quote}"
            </blockquote>
            <div className="testimonial-author">
              <div className="testimonial-avatar">
                {testimonial.author.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="testimonial-info">
                <span className="testimonial-name">{testimonial.author}</span>
                <span className="testimonial-role">
                  {testimonial.role}
                  {testimonial.company && `, ${testimonial.company}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
