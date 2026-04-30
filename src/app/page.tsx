import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCatalog from "@/components/ProductCatalog";
import OurStory from "@/components/OurStory";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030306] text-[#F5F7FF] selection:bg-[#5B3CFF] selection:text-white">
      <Navbar />
      <Hero />
      <ProductCatalog />
      <OurStory />
      <Footer />
    </main>
  );
}
