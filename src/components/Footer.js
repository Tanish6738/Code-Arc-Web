"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-white/70">© {new Date().getFullYear()} CodeARC. All rights reserved.</div>
        <div className="flex items-center gap-5 text-sm">
          <a href="#section2" className="text-white/80 hover:text-white">Features</a>
          <a href="#section4" className="text-white/80 hover:text-white">How it works</a>
          <a href="#section5" className="text-white/80 hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
