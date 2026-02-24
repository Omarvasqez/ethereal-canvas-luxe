import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const FooterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer ref={ref} className="py-24 md:py-32 px-8 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="font-display text-3xl md:text-4xl text-foreground tracking-wide mb-6"
        >
          LUMIÈRE
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="font-display text-base italic text-muted-foreground mb-16"
        >
          La belleza habita en lo que apenas se percibe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.6 }}
          className="flex items-center justify-center gap-12 mb-16"
        >
          {["Instagram", "Pinterest", "Atelier"].map((link) => (
            <a
              key={link}
              href="#"
              className="font-body text-xs tracking-luxe uppercase text-muted-foreground hover:text-gold transition-colors duration-700"
            >
              {link}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.9 }}
        >
          <div className="w-12 h-px bg-gold/30 mx-auto mb-8" />
          <p className="font-body text-[10px] tracking-ultra uppercase text-muted-foreground/60">
            © 2026 Lumière — Joyas Contemporáneas
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
