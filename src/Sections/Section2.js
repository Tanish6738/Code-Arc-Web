"use client";
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/utils/gsap';

const Section2 = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    // Entrance when section comes into view
    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, paragraphRef.current], {
        scrollTrigger: {
          trigger: '#section2',
          start: 'top 70%',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.2
      });

    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      id='section2'
      className='relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-slate-950 border-b border-white/10'
    >
      {/* Left content */}
      <div
        ref={leftRef}
        className='w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center gap-8 px-6 md:px-16'
      >
        <h2 ref={headingRef} className='font-display text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400'>
          ABOUT <span className='text-fuchsia-400'>US</span>
        </h2>
        <p ref={paragraphRef} className='font-tech text-base md:text-lg leading-relaxed text-slate-300 max-w-xl'>
          CodeARC isn’t just another code storage tool — it’s an integrated development workflow platform. Built for modern engineers & cross‑functional teams, it unifies structure, collaboration, AI‑assistance, and project orchestration into one adaptive system. From ideation to deployment, CodeARC reduces friction, amplifies velocity, and keeps context where it belongs: at your fingertips.
        </p>
      </div>

      {/* Right future content / decorative */}
      <div
        ref={rightRef}
        className='w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center'
      >
        
      </div>
    </section>
  );
};

export default Section2;