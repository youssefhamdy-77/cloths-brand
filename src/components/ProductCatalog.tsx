"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    id: "hoodies",
    name: "Hoodies",
    title: "Void Runner Hoodie",
    copy: "Oversized thermal hoodie built for warm nights and cold interiors.",
    image: "/images/hoodie.png",
    price: "$180.00",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#050505", "#1E1B4B", "#312E81", "#E5E7EB"],
    gridClass: "md:col-span-4",
    layout: "feature" // Large feature card
  },
  {
    id: "jackets",
    name: "Jackets",
    title: "Ion Lightweight Shell",
    copy: "Lightweight shell jacket with a clean silhouette and futuristic finish.",
    image: "/images/jacket.png",
    price: "$260.00",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#050505", "#1E1B4B", "#E5E7EB"],
    gridClass: "md:col-span-2",
    layout: "tall" // Tall vertical card
  },
  {
    id: "jeans",
    name: "Jeans",
    title: "Horizon Cargo Denim",
    copy: "Relaxed denim with a dark rinse and sculpted everyday fit.",
    image: "/images/jeans.png",
    price: "$210.00",
    sizes: ["28", "30", "32", "34"],
    colors: ["#050505", "#1E1B4B"],
    gridClass: "md:col-span-3",
    layout: "split" // Split-screen card
  },
  {
    id: "sweatpants",
    name: "Sweatpants",
    title: "Quantum Fleece",
    copy: "Relaxed fleece sweatpants made for travel, recovery, and late-night motion.",
    image: "/images/sweatpants.png",
    price: "$150.00",
    sizes: ["S", "M", "L", "XL"],
    colors: ["#050505", "#312E81", "#E5E7EB"],
    gridClass: "md:col-span-3",
    layout: "wide" // Wide horizontal card
  }
];

export default function ProductCatalog() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-[#030306] relative z-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(91,60,255,0.05)] via-transparent to-transparent pointer-events-none rounded-full blur-3xl z-0"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16 text-center md:text-left flex flex-col items-center md:items-start"
        >
          <h2 className="text-4xl md:text-5xl font-light text-[#F5F7FF] tracking-tight mb-4">
            The Summer <span className="text-[#6D4CFF] glow-text font-medium">Edit</span>
          </h2>
          <p className="text-[#A5A7C8] max-w-2xl text-sm md:text-base font-light leading-relaxed">
            Elevated layers, relaxed silhouettes, and dark-season essentials designed for after-sunset movement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-fr"
        >
          {categories.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={`group relative rounded-2xl overflow-hidden glass-panel flex flex-col bg-[#070718] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(109,76,255,0.4)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(91,60,255,0.15)] focus-within:border-[rgba(109,76,255,0.4)] focus-within:shadow-[0_0_30px_rgba(91,60,255,0.15)] min-h-[450px] lg:min-h-[500px] ${item.gridClass}`}
              tabIndex={0}
            >
              {/* Common Hover Reveal Overlay */}
              <div className="absolute inset-0 bg-[#070718]/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 z-30 flex flex-col justify-end p-8">
                <div className="translate-y-8 group-hover:translate-y-0 group-focus:translate-y-0 transition-transform duration-500 ease-out flex flex-col gap-6">
                  
                  <div className="flex justify-between items-end border-b border-[rgba(255,255,255,0.1)] pb-4">
                    <div>
                      <p className="text-[#A5A7C8] text-xs uppercase tracking-widest mb-1">{item.name}</p>
                      <h4 className="text-xl text-[#F5F7FF] font-medium">{item.title}</h4>
                    </div>
                    <span className="text-lg text-[#8B7CFF] font-light glow-text">{item.price}</span>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#A5A7C8] uppercase tracking-widest">Sizes</span>
                    <div className="flex gap-2">
                      {item.sizes.map((size) => (
                        <button key={size} className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.2)] bg-[rgba(0,0,0,0.3)] text-xs text-[#F5F7FF] font-light hover:border-[#6D4CFF] hover:bg-[rgba(91,60,255,0.1)] hover:shadow-[0_0_15px_rgba(109,76,255,0.3)] focus:border-[#6D4CFF] focus:ring-1 focus:ring-[#6D4CFF] transition-all outline-none">
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] text-[#A5A7C8] uppercase tracking-widest">Colors</span>
                    <div className="flex gap-3 items-center">
                      {item.colors.map((color, idx) => (
                        <button 
                          key={idx} 
                          className="w-6 h-6 rounded-full border border-[rgba(255,255,255,0.2)] hover:scale-110 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)] focus:scale-110 outline-none transition-all"
                          style={{ backgroundColor: color }}
                          aria-label={`Color ${color}`}
                        />
                      ))}
                    </div>
                  </div>

                  <button className="mt-2 w-full py-4 rounded-full bg-[#F5F7FF] text-[#050510] text-sm font-medium uppercase tracking-widest shadow-[0_0_30px_rgba(109,76,255,0.35)] hover:shadow-[0_0_40px_rgba(109,76,255,0.6)] hover:bg-white transition-all duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Layout Specific Implementations */}
              
              {/* Feature Hoodies Layout */}
              {item.layout === "feature" && (
                <div className="relative w-full h-full flex flex-col md:flex-row p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-[rgba(109,76,255,0.2)] via-transparent to-transparent z-0"></div>
                  <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-end pb-8">
                    <span className="text-[#8B7CFF] text-[10px] uppercase tracking-[0.2em] mb-4">Premium Basics</span>
                    <h3 className="text-3xl md:text-4xl text-[#F5F7FF] font-light mb-4 leading-tight">{item.title}</h3>
                    <p className="text-[#A5A7C8] text-sm font-light leading-relaxed max-w-sm">{item.copy}</p>
                  </div>
                  <div className="absolute right-0 bottom-0 top-0 w-full md:w-2/3 h-full z-0 overflow-hidden opacity-80 mix-blend-screen mix-blend-mode">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#070718] via-transparent to-transparent z-10"></div>
                    <Image src={item.image} alt={item.name} fill className="object-cover object-right-bottom group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              )}

              {/* Tall Jackets Layout */}
              {item.layout === "tall" && (
                <div className="relative w-full h-full flex flex-col p-6 overflow-hidden bg-gradient-to-br from-[#10102C] to-[#030306]">
                  {/* Subtle reflective line */}
                  <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(255,255,255,0.2)] to-transparent opacity-50 z-10"></div>
                  <div className="relative z-10 flex-grow pt-4 pl-6">
                    <h3 className="text-2xl text-[#F5F7FF] font-light mb-3">{item.title}</h3>
                    <p className="text-[#A5A7C8] text-xs font-light leading-relaxed">{item.copy}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-[60%] z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070718] via-transparent to-transparent z-10"></div>
                    <Image src={item.image} alt={item.name} fill className="object-cover object-top opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                </div>
              )}

              {/* Split Jeans Layout */}
              {item.layout === "split" && (
                <div className="relative w-full h-full flex flex-row overflow-hidden">
                  <div className="w-1/2 relative z-0 h-full">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#070718] z-10"></div>
                    <Image src={item.image} alt={item.name} fill className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#5B3CFF] to-transparent shadow-[0_0_10px_rgba(91,60,255,0.5)] z-20"></div>
                  <div className="w-1/2 relative z-10 flex flex-col justify-center p-8 bg-gradient-to-br from-[#0B0B24] to-[#070718]">
                    <span className="text-[#8B7CFF] text-[10px] uppercase tracking-widest mb-3">{item.name}</span>
                    <h3 className="text-2xl text-[#F5F7FF] font-light mb-3">{item.title}</h3>
                    <p className="text-[#A5A7C8] text-xs font-light leading-relaxed">{item.copy}</p>
                  </div>
                </div>
              )}

              {/* Wide Sweatpants Layout */}
              {item.layout === "wide" && (
                <div className="relative w-full h-full flex flex-col md:flex-row p-6 overflow-hidden bg-gradient-to-r from-[#030306] to-[#0B0B24] border-t border-[rgba(109,76,255,0.2)]">
                  <div className="absolute left-0 bottom-0 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#6D4CFF] to-transparent opacity-50 z-10"></div>
                  <div className="w-full md:w-5/12 relative z-0 h-[200px] md:h-full rounded-xl overflow-hidden mb-6 md:mb-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out" />
                  </div>
                  <div className="w-full md:w-7/12 relative z-10 flex flex-col justify-center pl-0 md:pl-8">
                    <h3 className="text-2xl text-[#F5F7FF] font-light mb-3">{item.title}</h3>
                    <p className="text-[#A5A7C8] text-xs font-light leading-relaxed max-w-xs">{item.copy}</p>
                  </div>
                </div>
              )}

            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
