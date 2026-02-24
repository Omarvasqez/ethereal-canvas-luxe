import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const ExperienceOverlay = () => {
  const [showHint, setShowHint] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleWheel = () => {
      if (!scrolled) {
        setScrolled(true);
        setTimeout(() => setShowHint(false), 800);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrolled]);

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Top bar - Brand */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-0 left-0 right-0 flex items-center justify-center py-8"
      >
        <h1 className="font-display text-2xl md:text-3xl tracking-[0.3em] text-foreground/80">
          LUMIÈRE
        </h1>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showHint ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <p className="font-body text-[11px] tracking-luxe uppercase text-muted-foreground/70">
          Desplázate para explorar
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gold/40"
        />
      </motion.div>

      {/* Bottom subtle brand line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 3 }}
        className="absolute bottom-6 left-0 right-0 flex justify-center"
      >
        <p className="font-display text-[10px] tracking-ultra italic text-muted-foreground/40">
          Donde la luz encuentra el silencio
        </p>
      </motion.div>

      {/* Side navigation dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4"
      >
        {["Éternel", "Éclat", "Entrelace", "Perle"].map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full bg-gold/30"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceOverlay;
