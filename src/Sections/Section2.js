"use client";
import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/utils/gsap";

// Ensure plugin is registered (safe if already registered elsewhere)
gsap.registerPlugin(ScrollTrigger);

const features = [
  "📂 Hierarchical Directory Structure – Organize snippets and projects in clean, tree-based directories.",
  "📝 Smart Snippet Management – Version history, syntax highlighting, and lightning-fast search.",
  "👥 Team Collaboration & Permissions – Real-time collaboration with role-based access and activity tracking.",
  "🤖 AI-Powered Tools – Generate, explain, analyze, and convert code with integrated AI.",
];

const Section2 = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade+slide the heading group
      gsap.from("#features-heading", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#features-heading",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stagger reveal feature cards
      const cards = gsap.utils.toArray(".feature-card");
      gsap.from(cards, {
        opacity: 0,
        y: 24,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: "#features-grid",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="section2"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full overflow-hidden scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-14 sm:py-20 md:py-24 h-full flex flex-col">
        {/* Title */}
        <div id="features-heading" className="max-w-3xl py-4 ">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight">
            Key Features
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/70 font-tech">
            Everything you need to capture ideas, collaborate, and ship faster — designed for
            developers, teams, and creators.
          </p>
        </div>

        {/* Central safe area reserved for animated boxes row (w-72 boxes => ~18rem tall) */}
        <div
          aria-hidden
          className="hidden sm:block pointer-events-none sm:my-8 md:my-10 sm:h-56 md:h-72 w-full"
        />

        {/* Features grid as semantic list */}
        <ul id="features-grid" role="list" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-auto">
          {features.map((text, idx) => {
            const content = text.slice(2);
            const [title, ...rest] = content.split(" – ");
            const desc = rest.join(" – ");
            return (
              <li
                key={idx}
                role="listitem"
                className="feature-card group rounded-2xl border border-white bg-black transition-colors duration-300 p-5 md:p-6 backdrop-blur-sm tech-grid-bg"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-white/10 grid place-items-center">
                    <span className="text-lg">{text.slice(0, 2)}</span>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white">{title}</h3>
                    {desc && (
                      <p className="mt-1 text-sm md:text-base leading-relaxed text-white/90">{desc}</p>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Section2;