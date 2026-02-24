import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
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
    description:
      "Un círculo de oro que contiene el silencio.\nLa luz descansa en su centro como una promesa.",
    scale: 2.8,
  },
  {
    position: [8, 0, -6] as [number, number, number],
    image: necklace,
    title: "Éclat",
    subtitle: "Collar con diamante suspendido",
    description:
      "Un punto de luz que cae sobre la piel\ncomo un susurro dorado.",
    scale: 2.5,
  },
  {
    position: [-8, 0, -12] as [number, number, number],
    image: bracelet,
    title: "Entrelace",
    subtitle: "Brazalete de filigrana dorada",
    description:
      "Hilos de oro que abrazan la muñeca\ncon la delicadeza de un recuerdo.",
    scale: 2.5,
  },
  {
    position: [0, 0, -22] as [number, number, number],
    image: earrings,
    title: "Perle",
    subtitle: "Pendientes de perla y oro",
    description:
      "La perfección esférica suspendida\nentre el silencio y la luz.",
    scale: 2.5,
  },
];

const JewelryExperience = () => {
  return (
    <div className="fixed inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          toneMapping: 3, // ACESFilmicToneMapping
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {/* Warm champagne environment */}
          <color attach="background" args={["#f0e6d6"]} />
          <fog attach="fog" args={["#f0e6d6", 10, 35]} />

          {/* Lighting */}
          <ambientLight intensity={0.6} color="#ffecd2" />
          <directionalLight
            position={[5, 8, 5]}
            intensity={0.8}
            color="#fff5e6"
          />
          <pointLight
            position={[-3, 2, 4]}
            intensity={0.3}
            color="#c9a96e"
          />
          <pointLight
            position={[3, -1, -8]}
            intensity={0.2}
            color="#d4b483"
          />

          {/* Camera movement */}
          <CameraRig />

          {/* Atmospheric particles */}
          <Particles count={60} />

          {/* Jewelry pieces floating in space */}
          {pieces.map((piece) => (
            <JewelryPiece key={piece.title} {...piece} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default JewelryExperience;
