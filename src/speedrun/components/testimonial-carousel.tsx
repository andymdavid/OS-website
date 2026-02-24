import { useEffect, useRef } from "react";
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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(false);

  // Double the testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let frame = 0;
    let lastTime = 0;
    let offset = 0;
    let loopWidth = 0;

    const updateLoopWidth = () => {
      const totalWidth = track.scrollWidth;
      loopWidth = totalWidth / 2;
    };

    updateLoopWidth();

    const onResize = () => {
      updateLoopWidth();
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(track);
    } else {
      window.addEventListener("resize", onResize);
    }

    const speed = 40; // px per second
    const maxDelta = 0.05;

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = Math.min((time - lastTime) / 1000, maxDelta);
      lastTime = time;

      if (!pausedRef.current && loopWidth > 0) {
        offset = (offset - speed * delta) % loopWidth;
        if (offset > 0) offset -= loopWidth;
        track.style.transform = `translate3d(${offset}px, 0, 0)`;
      }

      frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", onResize);
      }
    };
  }, []);

  return (
    <div
      className="testimonial-carousel"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div ref={trackRef} className="testimonial-track">
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
