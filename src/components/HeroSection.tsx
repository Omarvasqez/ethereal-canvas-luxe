import { motion } from "framer-motion";
import heroRing from "@/assets/hero-ring.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(38_45%_75%_/_0.15),_transparent_70%)]" />

      {/* Main image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="relative z-10 w-full max-w-3xl px-8 animate-breathe"
      >
        <img
          src={heroRing}
          alt="Anillo de oro con diamante solitario sobre seda champagne"
          className="w-full h-auto shadow-glow rounded-sm"
        />
      </motion.div>

      {/* Floating text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="relative z-10 mt-16 text-center"
      >
        <p className="font-display text-lg md:text-xl italic text-muted-foreground tracking-wide">
          Donde la luz encuentra el silencio
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gold/40"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
