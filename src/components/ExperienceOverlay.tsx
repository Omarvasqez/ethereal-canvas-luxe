import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const pieceNames = ["Éternel", "Éclat", "Entrelace", "Perle"];
const pieceDetails = [
  { subtitle: "Anillo solitario de diamante", desc: "Oro de 18 quilates con diamante talla brillante de 1.2ct. Engaste de seis garras. Acabado pulido espejo." },
  { subtitle: "Collar con diamante suspendido", desc: "Cadena de eslabones micro en oro rosa. Diamante de 0.8ct suspendido en engaste invisible." },
  { subtitle: "Brazalete de filigrana dorada", desc: "Filigrana artesanal en oro amarillo de 18 quilates. 47 horas de trabajo manual. Cierre oculto magnético." },
  { subtitle: "Pendientes de perla y oro", desc: "Perlas Akoya de 9mm seleccionadas a mano. Monturas de oro blanco con micro-pavé de diamantes." },
];

interface ExperienceOverlayProps {
  activePiece: number | null;
  onClose: () => void;
  scrollProgress: number;
}

const ExperienceOverlay = ({ activePiece, onClose, scrollProgress }: ExperienceOverlayProps) => {
  const [showEntrance, setShowEntrance] = useState(true);
  const [showHint, setShowHint] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Entrance curtain
  useEffect(() => {
    const timer = setTimeout(() => setShowEntrance(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleWheel = () => {
      if (!scrolled) {
        setScrolled(true);
        setTimeout(() => setShowHint(false), 600);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrolled]);

  // Determine closest piece based on scroll progress
  const activeDot = useMemo(() => {
    const segments = [0, 0.17, 0.33, 0.5, 0.67, 0.83, 1];
    // Map progress to piece: pieces are at segments 0-1, 1-2, 3-4, 5-6
    if (scrollProgress < 0.2) return 0;
    if (scrollProgress < 0.45) return 1;
    if (scrollProgress < 0.7) return 2;
    return 3;
  }, [scrollProgress]);

  return (
    <>
      {/* Entrance curtain */}
      <AnimatePresence>
        {showEntrance && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-background flex items-center justify-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="font-display text-3xl md:text-4xl tracking-[0.35em] text-foreground/70"
            >
              LUMIÈRE
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Top brand */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-center py-8"
        >
          <h1 className="font-display text-2xl md:text-3xl tracking-[0.3em] text-foreground/80">
            LUMIÈRE
          </h1>
        </motion.div>

        {/* Scroll hint */}
        <AnimatePresence>
          {showHint && !showEntrance && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
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
          )}
        </AnimatePresence>

        {/* Bottom tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activePiece !== null ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-6 left-0 right-0 flex justify-center"
        >
          <p className="font-display text-[10px] tracking-ultra italic text-muted-foreground/40">
            Donde la luz encuentra el silencio
          </p>
        </motion.div>

        {/* Side navigation dots - active tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.8 }}
          className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4"
        >
          {pieceNames.map((name, i) => (
            <div key={name} className="flex items-center gap-3">
              <motion.div
                animate={{
                  scale: activeDot === i ? 1.8 : 1,
                  opacity: activeDot === i ? 1 : 0.3,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
              <motion.span
                animate={{ opacity: activeDot === i ? 0.6 : 0 }}
                transition={{ duration: 0.4 }}
                className="font-display text-[10px] tracking-widest text-foreground/60"
              >
                {name}
              </motion.span>
            </div>
          ))}
        </motion.div>

        {/* Detail overlay when piece is clicked */}
        <AnimatePresence>
          {activePiece !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-auto"
              onClick={onClose}
            >
              {/* Vignette overlay */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/40" />

              {/* Detail info panel */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 max-w-xs"
              >
                <p className="font-body text-[10px] tracking-ultra uppercase text-gold/70 mb-3">
                  Colección Lumière
                </p>
                <h2 className="font-display text-4xl md:text-5xl tracking-wide text-foreground/90 mb-2">
                  {pieceNames[activePiece]}
                </h2>
                <p className="font-body text-[11px] tracking-luxe uppercase text-gold/80 mb-6">
                  {pieceDetails[activePiece].subtitle}
                </p>
                <p className="font-body text-sm leading-relaxed text-muted-foreground/80 mb-8">
                  {pieceDetails[activePiece].desc}
                </p>
                <div className="flex items-center gap-4">
                  <button className="font-body text-[11px] tracking-luxe uppercase text-foreground/70 border-b border-gold/30 pb-1 hover:border-gold/60 transition-colors duration-500">
                    Descubrir
                  </button>
                </div>
              </motion.div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-luxe uppercase text-muted-foreground/50"
              >
                Toca para volver
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ExperienceOverlay;
