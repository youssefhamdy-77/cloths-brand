"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Particles = () => {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5, // Tiny star-like particles
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    }));
    setParticles(arr);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_8px_#F5F7FF]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0%", "-50%"],
            x: ["0%", `${Math.random() * 10 - 5}%`],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030306]">
      {/* Background Gradients & Navy Panel Feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#070718] via-[#030306] to-[#030306] opacity-90 z-0"></div>
      
      {/* Soft central glow behind headline */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-[#26128A] to-[#5B3CFF] blur-[120px] opacity-20 z-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 2, delay: 0.2 }}
      />
      
      {/* Thin futuristic grid/line details */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 2, delay: 1 }}
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          backgroundPosition: 'center center'
        }}
      />
      
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.1)] to-transparent z-0"></div>

      {/* Curved glowing horizon shape near bottom */}
      <motion.div 
        className="absolute -bottom-[20vh] left-1/2 -translate-x-1/2 w-[150vw] h-[40vh] rounded-[100%] bg-gradient-to-t from-[#5B3CFF] to-transparent blur-[60px] opacity-30 z-0"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8B7CFF] to-transparent shadow-[0_0_20px_#6D4CFF] z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />

      <Particles />

      <motion.div
        className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="px-4 py-1.5 rounded-full border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.03)] backdrop-blur-md flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B7CFF] shadow-[0_0_8px_#8B7CFF]"></span>
            <span className="text-[#A5A7C8] uppercase tracking-widest text-[10px] font-medium">New Summer Vibes Collection</span>
          </div>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-[5rem] font-light tracking-tight text-[#F5F7FF] leading-[1.1] mb-8"
        >
          <motion.span variants={itemVariants} className="block">Luxury Essentials for</motion.span>
          <motion.span variants={itemVariants} className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F5F7FF] via-[#8B7CFF] to-[#6D4CFF] glow-text pb-2">
            Midnight Summers
          </motion.span>
        </motion.h1>
        
        <motion.p variants={itemVariants} className="text-[#A5A7C8] max-w-2xl mb-12 text-sm md:text-base lg:text-lg font-light leading-relaxed">
          A futuristic clothing collection designed for warm nights, city lights, and effortless movement.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
          <button className="px-8 py-3.5 rounded-full bg-[#F5F7FF] text-[#030306] text-sm font-medium hover:bg-[#A5A7C8] transition-colors w-full sm:w-auto">
            Shop Collection
          </button>
          <button className="px-8 py-3.5 rounded-full border border-[rgba(255,255,255,0.12)] text-[#F5F7FF] bg-[rgba(255,255,255,0.03)] backdrop-blur-md text-sm font-medium hover:border-[#6D4CFF] hover:bg-[rgba(91,60,255,0.1)] transition-all w-full sm:w-auto">
            View Lookbook
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
