import React from 'react'

const Section3 = () => {
  return (
  <section
    id='section3'
      className='relative md:min-h-[100svh] w-full overflow-hidden bg-black border-b border-white/10 scroll-mt-24 sm:scroll-mt-28 md:scroll-mt-32'
  >
      <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-14 sm:py-20 md:py-24'>
        <div className='flex flex-col md:flex-row'>
          {/* Left content */}
          <div
            className='w-full md:w-1/2 min-h-0 flex flex-col justify-center gap-5 sm:gap-6 md:gap-8'
          >
            <h2  className='font-display text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400'>
              CodeARC Isn’t Just Another Code Storage Tool—It’s a Complete Development Workflow Platform
            </h2>
            <p  className='font-tech text-sm sm:text-base md:text-lg leading-relaxed text-slate-300 max-w-xl'>
              CodeARC isn’t just another code storage tool — it’s an integrated development workflow platform. Built for modern engineers & cross‑functional teams, it unifies structure, collaboration, AI‑assistance, and project orchestration into one adaptive system. From ideation to deployment, CodeARC reduces friction, amplifies velocity, and keeps context where it belongs: at your fingertips.
            </p>
          </div>

          {/* Right future content / decorative */}
          <div
            className='hidden md:flex w-full md:w-1/2 min-h-[40svh] md:min-h-0 items-center justify-center'
          >
            {/* reserved for future visuals */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Section3