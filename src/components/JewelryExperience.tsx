import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useCallback } from "react";
import CameraRig from "./three/CameraRig";
import JewelryPiece from "./three/JewelryPiece";
import Particles from "./three/Particles";
import heroRing from "@/assets/hero-ring.png";
import necklace from "@/assets/necklace.png";
import bracelet from "@/assets/bracelet.png";
import earrings from "@/assets/earrings.png";

const pieces = [
  {
    position: [0, 0, 0] as [number, number, number],
    image: heroRing,
    title: "Éternel",
    subtitle: "Anillo solitario de diamante",
    description: "Un círculo de oro que contiene el silencio.\nLa luz descansa en su centro como una promesa.",
    scale: 2.8,
  },
  {
    position: [8, 0, -6] as [number, number, number],
    image: necklace,
    title: "Éclat",
    subtitle: "Collar con diamante suspendido",
    description: "Un punto de luz que cae sobre la piel\ncomo un susurro dorado.",
    scale: 2.5,
  },
  {
    position: [-8, 0, -12] as [number, number, number],
    image: bracelet,
    title: "Entrelace",
    subtitle: "Brazalete de filigrana dorada",
    description: "Hilos de oro que abrazan la muñeca\ncon la delicadeza de un recuerdo.",
    scale: 2.5,
  },
  {
    position: [0, 0, -22] as [number, number, number],
    image: earrings,
    title: "Perle",
    subtitle: "Pendientes de perla y oro",
    description: "La perfección esférica suspendida\nentre el silencio y la luz.",
    scale: 2.5,
  },
];

interface JewelryExperienceProps {
  activePiece: number | null;
  onPieceClick: (index: number | null) => void;
  onProgressChange: (progress: number) => void;
}

const JewelryExperience = ({ activePiece, onPieceClick, onProgressChange }: JewelryExperienceProps) => {
  const handlePieceClick = useCallback((index: number) => {
    onPieceClick(activePiece === index ? null : index);
  }, [activePiece, onPieceClick]);

  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: 3,
          toneMappingExposure: 1.2,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#f0e6d6"]} />
          <fog attach="fog" args={["#f0e6d6", 12, 40]} />

          {/* Studio lighting */}
          <ambientLight intensity={0.5} color="#ffecd2" />
          <directionalLight position={[5, 8, 5]} intensity={0.9} color="#fff5e6" />
          <directionalLight position={[-4, 3, -2]} intensity={0.3} color="#ffe8c4" />
          <pointLight position={[-3, 2, 4]} intensity={0.4} color="#c9a96e" distance={15} decay={2} />
          <pointLight position={[3, -1, -8]} intensity={0.25} color="#d4b483" distance={20} decay={2} />
          {/* Rim light for detail mode */}
          <pointLight position={[0, 3, 2]} intensity={0.15} color="#ffffff" distance={10} decay={2} />

          <CameraRig
            activePiece={activePiece}
            piecePositions={pieces.map(p => p.position)}
            onProgressChange={onProgressChange}
          />

          <Particles count={100} />

          {pieces.map((piece, i) => (
            <JewelryPiece
              key={piece.title}
              {...piece}
              isActive={activePiece === i}
              onClick={() => handlePieceClick(i)}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default JewelryExperience;
