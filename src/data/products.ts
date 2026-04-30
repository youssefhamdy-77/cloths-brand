export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  colors: string[];
  image: string;
  description: string;
  layout: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Nebula Trench Coat",
    category: "Outerwear",
    price: 340,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#0B0B24", "#000000"],
    image: "/images/trench.png",
    description: "A sleek, weather-resistant trench coat featuring electric violet stitching and subtle glassmorphism hardware.",
    layout: "large"
  },
  {
    id: 2,
    name: "Void Runner Hoodie",
    category: "Sweatshirts",
    price: 180,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#10102C", "#5B3CFF"],
    image: "/images/hoodie.png",
    description: "Ultra-heavyweight cotton hoodie with a deep indigo glow-in-the-dark logo and futuristic drop shoulder.",
    layout: "medium"
  },
  {
    id: 3,
    name: "Horizon Cargo Pants",
    category: "Bottoms",
    price: 210,
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#070718", "#10102C"],
    image: "/images/jeans.png",
    description: "Tech-wear inspired cargo pants with magnetic closures and soft blue violet accent lines.",
    layout: "medium"
  },
  {
    id: 4,
    name: "Ion Lightweight Jacket",
    category: "Outerwear",
    price: 260,
    sizes: ["S", "M", "L"],
    colors: ["#6D4CFF", "#000000"],
    image: "/images/jacket.png",
    description: "Windbreaker designed with thin futuristic line details and neon purple zips.",
    layout: "small"
  },
  {
    id: 5,
    name: "Quantum Sweatpants",
    category: "Bottoms",
    price: 150,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#030306", "#0B0B24"],
    image: "/images/sweatpants.png",
    description: "Relaxed fit sweatpants with curved gradient shapes on the side panels and an elastic drawstring waist.",
    layout: "small"
  }
];
