"use client";
import React from "react";

const Section4 = () => {
  return (
    <section
      id="section4"
      className="relative min-h-[100svh] w-full bg-black text-white"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 md:py-24">
        {/* Heading */}
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold tracking-tight">
            How CodeARC Works
          </h2>
          <p className="mt-2 text-sm md:text-base text-white/70 font-tech">
            A streamlined workflow from organizing snippets to collaborating and shipping with AI.
          </p>
        </div>

        {/* Content flanking the center where animated boxes sit */}
  <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-start gap-6 sm:gap-8 md:gap-10">
          {/* Left column */}
          <div className="flex-1 space-y-4 md:space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="font-semibold text-lg md:text-xl">Organize & Store</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">
                Create projects and snippets in a structured directory system.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="font-semibold text-lg md:text-xl">Collaborate Seamlessly</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">
                Share workspaces, assign roles, and track activity.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="font-semibold text-lg md:text-xl">Leverage AI</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">
                Generate, analyze, and convert code or create documentation instantly.
              </p>
            </div>
          </div>

          {/* Center spacer to keep room for the animated boxes (visible on md+) */}
          <div
            aria-hidden
            className="hidden md:block w-80 lg:w-96 shrink-0"
          />

          {/* Right column */}
          <div className="flex-1 space-y-4 md:space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="font-semibold text-lg md:text-xl">Execute & Export</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">
                Run code within CodeARC and export in multiple formats.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="font-semibold text-lg md:text-xl">Share Knowledge</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">
                Publish tutorials, guides, and updates with the built-in blog.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 md:p-6">
              <h3 className="font-semibold text-lg md:text-xl">Manage Projects</h3>
              <p className="mt-1 text-sm md:text-base text-white/80">
                Stay on top of deadlines and tasks with AI-powered project insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;