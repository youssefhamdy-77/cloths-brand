"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  const lineVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section className="relative py-40 px-6 md:px-12 lg:px-24 bg-[#030306] overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      {/* Subtle Background Glow Movement */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-gradient-to-tr from-[#26128A] to-[#10102C] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
        animate={{ 
          scale: [1, 1.1, 0.9, 1],
          opacity: [0.15, 0.25, 0.15]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Minimal Line Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5 }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent mb-24 origin-center"
        />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          className="space-y-12 md:space-y-16 text-center md:text-left"
        >
          <motion.h3 
            variants={lineVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-light text-[#F5F7FF] leading-tight"
          >
            Amber exists between <span className="text-[#8B7CFF] glow-text italic">motion</span> and <span className="text-[#A5A7C8]">atmosphere.</span>
          </motion.h3>

          <motion.p 
            variants={lineVariants}
            className="text-2xl md:text-4xl lg:text-5xl font-light text-[#A5A7C8] leading-tight"
          >
            We design clothing for the hours when the city cools, the lights turn <span className="text-[#6D4CFF] glow-text">violet</span>, and movement feels effortless.
          </motion.p>

          <motion.p 
            variants={lineVariants}
            className="text-xl md:text-3xl lg:text-4xl font-light text-[#F5F7FF] leading-tight"
          >
            Every piece is built to feel <span className="text-[#A5A7C8]">minimal</span>, <span className="text-[#A5A7C8]">elevated</span>, and ready for the <span className="text-[#8B7CFF] glow-text">rhythm of summer</span> after dark.
          </motion.p>
        </motion.div>

        {/* Minimal Line Divider */}
        <motion.div 
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(91,60,255,0.3)] to-transparent mt-24 origin-center"
        />

        {/* Final Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#8B7CFF] glow-text font-medium">
            Designed for the ones who move after sunset.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
