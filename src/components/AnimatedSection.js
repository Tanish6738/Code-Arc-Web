// components/AnimatedSection.js
"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";

export default function AnimatedSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    gsap.fromTo(
      section,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef}>
      <h2>Animated Section</h2>
      <p>This section will animate on scroll</p>
    </section>
  );
}