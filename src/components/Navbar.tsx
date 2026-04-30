"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav
        className="flex items-center justify-between px-8 py-4 rounded-full w-full max-w-5xl transition-all duration-500"
        style={{
          background: "rgba(15, 15, 45, 0.55)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 0 40px rgba(91, 60, 255, 0.18)"
        }}
      >
        <div className="flex-shrink-0">
          <h1 className="text-xl font-medium tracking-[0.15em] text-[#F5F7FF] glow-text cursor-pointer uppercase">
            Amber
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Summer", "Hoodies", "Jackets", "Jeans", "Story"].map((item) => (
            <span 
              key={item} 
              className="text-sm font-light text-[#A5A7C8] hover:text-[#F5F7FF] cursor-pointer transition-colors"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex-shrink-0">
          <button className="px-6 py-2 rounded-full bg-[#F5F7FF] text-[#030306] text-sm font-medium hover:bg-[#A5A7C8] transition-colors">
            Shop Now
          </button>
        </div>
      </nav>
    </motion.div>
  );
}
