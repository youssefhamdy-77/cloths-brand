"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#030306] border-t border-[rgba(255,255,255,0.05)] pt-24 pb-12 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[1px] bg-gradient-to-r from-transparent via-[#5B3CFF] to-transparent shadow-[0_0_30px_#6D4CFF] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_100%_100%,_var(--tw-gradient-stops))] from-[rgba(38,18,138,0.2)] to-transparent pointer-events-none rounded-tl-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-16 mb-20 relative z-10">
        
        {/* Brand & Newsletter */}
        <div className="w-full md:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              {/* Minimal Abstract Circular Mark */}
              <div className="w-6 h-6 rounded-full border-[1.5px] border-[#F5F7FF] flex items-center justify-center shadow-[0_0_10px_rgba(91,60,255,0.4)] relative">
                <div className="absolute inset-1 rounded-full bg-[#8B7CFF] opacity-40"></div>
                <div className="w-1 h-1 rounded-full bg-[#F5F7FF]"></div>
              </div>
              <h2 className="text-xl font-medium tracking-[0.2em] text-[#F5F7FF] uppercase glow-text">
                Amber
              </h2>
            </div>
            <p className="text-sm font-light text-[#A5A7C8] mb-8 leading-relaxed max-w-sm">
              Defining the future of luxury streetwear through digital aesthetics and premium physical construction.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="newsletter" className="text-[10px] uppercase tracking-widest text-[#F5F7FF] font-medium">Join the Access List</label>
            <div className="flex w-full max-w-sm gap-2">
              <input 
                type="email" 
                id="newsletter"
                placeholder="Enter your email"
                aria-label="Email address for newsletter"
                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.12)] rounded-lg text-sm text-[#F5F7FF] placeholder-[#6F7195] focus:outline-none focus:border-[#6D4CFF] focus:ring-1 focus:ring-[#6D4CFF] transition-all"
              />
              <button 
                aria-label="Subscribe to newsletter"
                className="px-6 py-3 bg-[#F5F7FF] text-[#030306] text-sm font-medium rounded-lg hover:bg-white hover:shadow-[0_0_20px_rgba(109,76,255,0.5)] focus:outline-none focus:ring-2 focus:ring-[#6D4CFF] focus:ring-offset-2 focus:ring-offset-[#030306] transition-all"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="w-full md:w-6/12 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-widest text-[#F5F7FF] font-medium">Explore</h3>
            <ul className="flex flex-col gap-4">
              {["Summer", "Hoodies", "Jackets", "Jeans"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#A5A7C8] hover:text-[#8B7CFF] font-light transition-colors focus:outline-none focus:text-[#8B7CFF]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-widest text-[#F5F7FF] font-medium">Support</h3>
            <ul className="flex flex-col gap-4">
              {["Shipping", "Returns", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#A5A7C8] hover:text-[#8B7CFF] font-light transition-colors focus:outline-none focus:text-[#8B7CFF]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="text-[10px] uppercase tracking-widest text-[#F5F7FF] font-medium">Connect</h3>
            <ul className="flex flex-col gap-4">
              {["Instagram", "TikTok", "X"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#A5A7C8] hover:text-[#8B7CFF] font-light transition-colors focus:outline-none focus:text-[#8B7CFF]">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-8 border-t border-[rgba(255,255,255,0.05)] relative z-10">
        <p className="text-xs text-[#6F7195] font-light">
          © 2026 Amber. All rights reserved.
        </p>
        <div className="flex gap-2">
          {/* Decorative subtle dots */}
          <span className="w-1 h-1 rounded-full bg-[#6F7195]"></span>
          <span className="w-1 h-1 rounded-full bg-[#6F7195]"></span>
          <span className="w-1 h-1 rounded-full bg-[#6D4CFF] shadow-[0_0_5px_#8B7CFF]"></span>
        </div>
      </div>
    </footer>
  );
}
