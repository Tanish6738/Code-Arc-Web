import React from 'react'

const Section3 = () => {
  return (
    <section
        id='section3'
            className='relative min-h-[100svh] w-full flex flex-col md:flex-row overflow-hidden bg-black border-b border-white/10'
    >
      {/* Left content */}
      <div
        className='w-full md:w-1/2 min-h-[50svh] md:min-h-0 flex flex-col justify-center gap-6 md:gap-8 px-6 md:px-12 lg:px-16 py-10 md:py-0'
      >
        <h2  className='font-display text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400'>
          CodeARC Isn’t Just Another Code Storage Tool—It’s a Complete Development Workflow Platform
        </h2>
        <p  className='font-tech text-base md:text-lg leading-relaxed text-slate-300 max-w-xl'>
          CodeARC isn’t just another code storage tool — it’s an integrated development workflow platform. Built for modern engineers & cross‑functional teams, it unifies structure, collaboration, AI‑assistance, and project orchestration into one adaptive system. From ideation to deployment, CodeARC reduces friction, amplifies velocity, and keeps context where it belongs: at your fingertips.
        </p>
      </div>

      {/* Right future content / decorative */}
      <div
        className='w-full md:w-1/2 min-h-[40svh] md:min-h-0 flex items-center justify-center px-6 md:px-12 lg:px-16 py-10 md:py-0'
      >
        {/* reserved for future visuals */}
      </div>
    </section>
  )
}

export default Section3