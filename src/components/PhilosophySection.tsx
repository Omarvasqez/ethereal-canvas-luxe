import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PhilosophySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-8 bg-ivory"
    >
      <div className="max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="font-body text-xs tracking-ultra uppercase text-gold mb-12"
        >
          Filosofía
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="font-display text-3xl md:text-5xl leading-snug text-foreground mb-10"
        >
          Cada pieza nace del silencio.
          <br />
          <span className="italic text-muted-foreground">
            Un susurro de oro y luz.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-body text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto"
        >
          Creamos joyas que no buscan ser vistas, sino sentidas. 
          Cada engaste es una conversación entre la piedra y la mano 
          que la moldea, entre el brillo y la calma que lo contiene.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 1 }}
          className="mt-16 w-16 h-px bg-gold/40 mx-auto"
        />
      </div>
    </section>
  );
};

export default PhilosophySection;
