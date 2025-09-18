import React from 'react'

const Section3 = () => {
  return (
    <div

        id='section3'
            className='relative h-screen w-full flex flex-col md:flex-row overflow-hidden bg-black border-b border-white/10'
    >
      {/* Left content */}
      <div
        className='w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center gap-8 px-6 md:px-16'
      >
        <h2  className='font-display text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400'>
          ABOUT <span className='text-fuchsia-400'>US</span>
        </h2>
        <p  className='font-tech text-base md:text-lg leading-relaxed text-slate-300 max-w-xl'>
          CodeARC isn’t just another code storage tool — it’s an integrated development workflow platform. Built for modern engineers & cross‑functional teams, it unifies structure, collaboration, AI‑assistance, and project orchestration into one adaptive system. From ideation to deployment, CodeARC reduces friction, amplifies velocity, and keeps context where it belongs: at your fingertips.
        </p>
      </div>

      {/* Right future content / decorative */}
      <div
        className='w-full md:w-1/2 h-1/2 md:h-full flex items-center justify-center'
      >
        
      </div>
    </div>
  )
}

export default Section3