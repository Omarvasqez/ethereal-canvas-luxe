import { useRef, useState, useMemo } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";

interface JewelryPieceProps {
  position: [number, number, number];
  image: string;
  title: string;
  subtitle: string;
  description: string;
  rotation?: [number, number, number];
  scale?: number;
  isActive: boolean;
  onClick: () => void;
}

const JewelryPiece = ({
  position,
  image,
  title,
  subtitle,
  description,
  rotation = [0, 0, 0],
  scale = 2.5,
  isActive,
  onClick,
}: JewelryPieceProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const imageGroupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const imageScale = useRef(1);
  const glowIntensity = useRef(0);

  const texture = useLoader(THREE.TextureLoader, image);

  const material = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.97,
      toneMapped: false,
      side: THREE.DoubleSide,
    });
  }, [texture]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const clampedDelta = Math.min(delta, 0.05);

    const dist = camera.position.distanceTo(new THREE.Vector3(...position));

    // Hover glow with smooth transition
    const targetGlow = hovered ? 0.12 : (dist < 5 ? 0.04 : 0.02);
    glowIntensity.current = THREE.MathUtils.lerp(glowIntensity.current, targetGlow, clampedDelta * 4);

    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity.current;
    }

    // Breathing animation
    const time = Date.now() * 0.0006;
    const breathe = Math.sin(time + position[0] * 0.5) * 0.015 + 1;
    const targetScale = isActive ? 1.08 : hovered ? 1.04 : breathe;
    imageScale.current = THREE.MathUtils.lerp(imageScale.current, targetScale, clampedDelta * 3);

    // Apply scale imperatively
    if (imageGroupRef.current) {
      const s = imageScale.current * scale;
      imageGroupRef.current.scale.set(s, s, 1);
    }

    // Gentle float
    groupRef.current.position.y =
      position[1] + Math.sin(time * 0.8 + position[0]) * 0.06;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group
        ref={imageGroupRef}
        scale={[scale, scale, 1]}
        onPointerOver={() => {
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "default";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        {/* Jewelry image as textured plane */}
        <mesh>
          <planeGeometry args={[3, 3]} />
          <primitive object={material} attach="material" />
        </mesh>

        {/* Multi-layer glow for depth */}
        <mesh ref={glowRef} position={[0, 0, -0.05]}>
          <planeGeometry args={[3.8, 3.8]} />
          <meshBasicMaterial color="#c9a96e" transparent opacity={0.03} />
        </mesh>
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[5, 5]} />
          <meshBasicMaterial color="#c9a96e" transparent opacity={0.015} />
        </mesh>
      </group>
    </group>
  );
};

export default JewelryPiece;
