import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-background/80 backdrop-blur-sm"
    >
      <span className="font-body text-xs tracking-ultra uppercase text-muted-foreground">
        Colecciones
      </span>

      <h1 className="font-display text-xl md:text-2xl tracking-luxe text-foreground">
        LUMIÈRE
      </h1>

      <span className="font-body text-xs tracking-ultra uppercase text-muted-foreground">
        Contacto
      </span>
    </motion.nav>
  );
};

export default Navbar;
