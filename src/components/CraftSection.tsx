import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CraftSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center px-8 bg-champagne"
    >
      <div className="max-w-xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="font-body text-xs tracking-ultra uppercase text-gold mb-12"
        >
          El Oficio
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-display text-2xl md:text-4xl text-foreground leading-snug mb-8"
        >
          Manos que escuchan al metal.
          <br />
          Ojos que conversan con la piedra.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-body text-sm text-muted-foreground leading-relaxed"
        >
          Cada joya es moldeada a mano en nuestro atelier, 
          donde el tiempo se detiene para que cada faceta 
          capture exactamente la luz que merece.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
          className="mt-16 w-24 h-px bg-gold/30 mx-auto origin-center"
        />
      </div>
    </section>
  );
};

export default CraftSection;
