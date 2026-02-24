import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import necklaceImg from "@/assets/necklace.png";
import braceletImg from "@/assets/bracelet.png";
import earringsImg from "@/assets/earrings.png";

const pieces = [
  {
    image: necklaceImg,
    title: "Éclat",
    subtitle: "Collar con diamante solitario",
    description: "Un punto de luz que descansa sobre la piel como una promesa.",
  },
  {
    image: braceletImg,
    title: "Entrelace",
    subtitle: "Brazalete de filigrana dorada",
    description: "Hilos de oro que abrazan la muñeca con la delicadeza de un recuerdo.",
  },
  {
    image: earringsImg,
    title: "Perle",
    subtitle: "Pendientes de perla y oro",
    description: "La perfección esférica suspendida entre el silencio y la luz.",
  },
];

const PieceCard = ({ piece, index }: { piece: typeof pieces[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.2 }}
      className="group flex flex-col items-center text-center"
    >
      <div className="relative overflow-hidden mb-8">
        <motion.img
          src={piece.image}
          alt={piece.subtitle}
          className="w-72 h-72 md:w-80 md:h-80 object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
        {/* Hover glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(38_55%_52%_/_0.08),_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>

      <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-wide mb-2">
        {piece.title}
      </h3>
      <p className="font-body text-xs tracking-luxe uppercase text-gold mb-4">
        {piece.subtitle}
      </p>
      <p className="font-display text-sm italic text-muted-foreground max-w-xs leading-relaxed">
        {piece.description}
      </p>
    </motion.div>
  );
};

const CollectionSection = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="py-32 md:py-48 px-8 bg-background">
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.2 }}
        className="text-center mb-24"
      >
        <p className="font-body text-xs tracking-ultra uppercase text-gold mb-6">
          Colección
        </p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground">
          Piezas Únicas
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {pieces.map((piece, i) => (
          <PieceCard key={piece.title} piece={piece} index={i} />
        ))}
      </div>
    </section>
  );
};

export default CollectionSection;
