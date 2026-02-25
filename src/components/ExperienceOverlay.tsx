import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { ShoppingBag, ChevronDown, Info } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import heroRing from "@/assets/hero-ring.png";
import necklace from "@/assets/necklace.png";
import bracelet from "@/assets/bracelet.png";
import earrings from "@/assets/earrings.png";

const pieceNames = ["Éternel", "Éclat", "Entrelace", "Perle"];

const pieceData = [
  {
    subtitle: "Anillo solitario de diamante",
    desc: "Un círculo de oro que contiene el silencio. La luz descansa en su centro como una promesa.",
    specs: "Oro 18K · Diamante 1.2ct · Talla brillante · Engaste 6 garras",
    price: 8900,
    variants: ["Talla 50", "Talla 52", "Talla 54", "Talla 56"],
    image: heroRing,
  },
  {
    subtitle: "Collar con diamante suspendido",
    desc: "Un punto de luz que cae sobre la piel como un susurro dorado.",
    specs: "Oro rosa 18K · Diamante 0.8ct · Cadena 42cm · Engaste invisible",
    price: 6400,
    variants: ["42cm", "45cm", "50cm"],
    image: necklace,
  },
  {
    subtitle: "Brazalete de filigrana dorada",
    desc: "Hilos de oro que abrazan la muñeca con la delicadeza de un recuerdo.",
    specs: "Oro amarillo 18K · Filigrana artesanal · 47h trabajo manual · Cierre magnético",
    price: 5200,
    variants: ["S (15cm)", "M (17cm)", "L (19cm)"],
    image: bracelet,
  },
  {
    subtitle: "Pendientes de perla y oro",
    desc: "La perfección esférica suspendida entre el silencio y la luz.",
    specs: "Perlas Akoya 9mm · Oro blanco 18K · Micro-pavé diamantes",
    price: 3800,
    variants: ["Cierre presión", "Cierre omega"],
    image: earrings,
  },
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
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const [showVariants, setShowVariants] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const { addItem, toggleCart, totalItems } = useCart();

  // Reset variant selection when piece changes
  useEffect(() => {
    if (activePiece !== null) {
      setSelectedVariant(pieceData[activePiece].variants[0]);
      setShowVariants(false);
      setShowSpecs(false);
      setAddedFeedback(false);
    }
  }, [activePiece]);

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

  const activeDot = useMemo(() => {
    if (scrollProgress < 0.2) return 0;
    if (scrollProgress < 0.45) return 1;
    if (scrollProgress < 0.7) return 2;
    return 3;
  }, [scrollProgress]);

  const handleAddToCart = () => {
    if (activePiece === null || !selectedVariant) return;
    const piece = pieceData[activePiece];
    addItem({
      id: activePiece,
      title: pieceNames[activePiece],
      subtitle: piece.subtitle,
      price: piece.price,
      variant: selectedVariant,
      image: piece.image,
    });
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-center"
            >
              <h1 className="font-display text-3xl md:text-4xl tracking-[0.35em] text-foreground/70">
                LUMIÈRE
              </h1>
              <p className="font-body text-[10px] tracking-ultra text-muted-foreground/40 mt-3">
                Haute Joaillerie
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 z-10 pointer-events-none">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 md:px-12 py-6"
        >
          <h1 className="font-display text-lg md:text-xl tracking-[0.3em] text-foreground/80">
            LUMIÈRE
          </h1>

          {/* Cart button */}
          <button
            onClick={toggleCart}
            className="pointer-events-auto relative flex items-center gap-2 group"
          >
            <ShoppingBag className="w-4 h-4 text-foreground/60 group-hover:text-foreground/90 transition-colors" strokeWidth={1.5} />
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-gold text-primary-foreground text-[9px] rounded-full flex items-center justify-center font-body"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
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

        {/* Side navigation dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: activePiece !== null ? 0 : 1 }}
          transition={{ duration: 0.6 }}
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

        {/* ══════ DETAIL + E-COMMERCE OVERLAY ══════ */}
        <AnimatePresence>
          {activePiece !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pointer-events-auto"
              onClick={(e) => {
                // Only close if clicking the backdrop, not UI elements
                if (e.target === e.currentTarget) onClose();
              }}
            >
              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/50" />

              {/* Left: Product info */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-6 md:left-14 top-1/2 -translate-y-1/2 max-w-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <p className="font-body text-[10px] tracking-ultra uppercase text-gold/60 mb-3">
                  Colección Lumière
                </p>
                <h2 className="font-display text-4xl md:text-5xl tracking-wide text-foreground/90 mb-1">
                  {pieceNames[activePiece]}
                </h2>
                <p className="font-body text-[11px] tracking-luxe uppercase text-gold/70 mb-4">
                  {pieceData[activePiece].subtitle}
                </p>
                <p className="font-body text-sm leading-relaxed text-muted-foreground/70 mb-6 max-w-[260px]">
                  {pieceData[activePiece].desc}
                </p>

                {/* Specs toggle */}
                <button
                  onClick={() => setShowSpecs(!showSpecs)}
                  className="flex items-center gap-2 mb-6 group"
                >
                  <Info className="w-3 h-3 text-gold/50 group-hover:text-gold/80 transition-colors" strokeWidth={1.5} />
                  <span className="font-body text-[10px] tracking-luxe uppercase text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors">
                    {showSpecs ? "Ocultar detalles" : "Ver detalles técnicos"}
                  </span>
                </button>

                <AnimatePresence>
                  {showSpecs && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="font-body text-[11px] leading-relaxed text-muted-foreground/50 mb-6 overflow-hidden"
                    >
                      {pieceData[activePiece].specs}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Right: Purchase panel */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-6 md:right-14 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-[220px]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Price */}
                <p className="font-display text-2xl tracking-wide text-foreground/90 mb-6">
                  €{pieceData[activePiece].price.toLocaleString()}
                </p>

                {/* Variant selector */}
                <div className="mb-5">
                  <button
                    onClick={() => setShowVariants(!showVariants)}
                    className="w-full flex items-center justify-between py-2.5 px-0 border-b border-gold/20 hover:border-gold/40 transition-colors"
                  >
                    <span className="font-body text-[11px] tracking-luxe uppercase text-foreground/70">
                      {selectedVariant}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gold/50 transition-transform duration-300 ${showVariants ? "rotate-180" : ""}`}
                      strokeWidth={1.5}
                    />
                  </button>

                  <AnimatePresence>
                    {showVariants && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="py-2 space-y-1">
                          {pieceData[activePiece].variants.map((v) => (
                            <button
                              key={v}
                              onClick={() => {
                                setSelectedVariant(v);
                                setShowVariants(false);
                              }}
                              className={`w-full text-left py-2 px-3 font-body text-[11px] tracking-luxe uppercase transition-colors duration-300 ${
                                selectedVariant === v
                                  ? "text-foreground/90 bg-gold/5"
                                  : "text-muted-foreground/60 hover:text-foreground/70 hover:bg-gold/5"
                              }`}
                            >
                              {v}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Add to cart */}
                <motion.button
                  onClick={handleAddToCart}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 bg-foreground/90 text-primary-foreground font-body text-[10px] tracking-ultra uppercase hover:bg-foreground transition-colors duration-500 mb-3"
                >
                  {addedFeedback ? "✓ Añadido" : "Añadir a la bolsa"}
                </motion.button>

                <p className="font-body text-[9px] text-center text-muted-foreground/40 tracking-wide">
                  Envío gratuito · Certificado de autenticidad
                </p>
              </motion.div>

              {/* Close hint */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 font-body text-[10px] tracking-luxe uppercase text-muted-foreground/40"
              >
                Toca el fondo para volver
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ExperienceOverlay;
