import { useState, useCallback } from "react";
import JewelryExperience from "@/components/JewelryExperience";
import ExperienceOverlay from "@/components/ExperienceOverlay";
import CartPanel from "@/components/CartPanel";

const Index = () => {
  const [activePiece, setActivePiece] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handlePieceClick = useCallback((index: number | null) => {
    setActivePiece(index);
  }, []);

  const handleClose = useCallback(() => {
    setActivePiece(null);
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-background">
      <JewelryExperience
        activePiece={activePiece}
        onPieceClick={handlePieceClick}
        onProgressChange={setScrollProgress}
      />
      <ExperienceOverlay
        activePiece={activePiece}
        onClose={handleClose}
        scrollProgress={scrollProgress}
      />
      <CartPanel />
    </div>
  );
};

export default Index;
