import React from "react";

// Pure CSS animated hero title (no GSAP). Each letter slides & springs in with a
// subtle rotation while a looping gradient shimmers across the text.
// Easily tweak timing via --stagger and colors in the gradient below.
const WORD = "CODEARC";

const Section1 = () => {
  return (
    <div
      id="section1"
      className="h-screen w-full flex justify-center items-center bg-black text-white select-none"
    >
      <div className="flex flex-col justify-center items-center gap-8 px-4 text-center">
        <h1
          className="hero-title font-bold font-display tracking-wide"
          aria-label={WORD}
        >
          CODEARC
        </h1>
        <p className="max-w-2xl text-slate-300 font-tech text-base md:text-lg leading-relaxed">
          CodeARC is the all-in-one developer platform that goes beyond simple snippet storage—
          organize code with a hierarchical directory structure, collaborate with your team, and
          supercharge productivity using built-in AI tools.
        </p>
      </div>
      <style jsx>{`
        .hero-title {
          --stagger: 0.12s;
          font-size: clamp(3rem, 17vw, 9rem);
          line-height: 0.9;
          position: relative;
          display: inline-block;
          background: linear-gradient(120deg,#06b6d4,#6366f1,#a855f7,#6366f1,#06b6d4);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          color: transparent;
          animation: gradientShift 8s ease-in-out infinite;
          filter: drop-shadow(0 0 12px rgba(56,189,248,0.12));
          white-space: normal;
        }
        .hero-letter {
          display: inline-block;
          transform-origin: 50% 70%;
          opacity: 0;
          animation: letterIn 0.9s cubic-bezier(.25,.9,.35,1.4) forwards;
          animation-delay: calc(var(--i) * var(--stagger));
        }
        /* Keyframes */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes letterIn {
          0% { opacity:0; transform: translateY(60%) rotate(8deg) scale(.8); }
          55% { opacity:1; transform: translateY(-14%) rotate(-3deg) scale(1.07); }
          75% { transform: translateY(6%) rotate(1deg) scale(.98); }
          100% { opacity:1; transform: translateY(0) rotate(0deg) scale(1); }
        }
        /* Optional subtle hover interaction */
        .hero-title:hover .hero-letter {
          animation-play-state: paused; /* Pause entrance if still running */
        }
        .hero-title:hover { filter: drop-shadow(0 0 18px rgba(168,85,247,0.25)); }
      `}</style>
    </div>
  );
};

export default Section1;
