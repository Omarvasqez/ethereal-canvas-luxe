import { useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Image, Text } from "@react-three/drei";
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
  const glowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const textOpacity = useRef(0);
  const imageScale = useRef(1);
  const glowIntensity = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const clampedDelta = Math.min(delta, 0.05);

    const dist = camera.position.distanceTo(new THREE.Vector3(...position));

    // Text visibility based on proximity
    const targetOpacity = dist < 6 ? Math.max(0, 1 - (dist - 2.5) / 3.5) : 0;
    textOpacity.current = THREE.MathUtils.lerp(textOpacity.current, targetOpacity, clampedDelta * 3);

    // Hover glow with smooth transition
    const targetGlow = hovered ? 0.12 : (dist < 5 ? 0.04 : 0.02);
    glowIntensity.current = THREE.MathUtils.lerp(glowIntensity.current, targetGlow, clampedDelta * 4);

    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = glowIntensity.current;
    }

    // Breathing animation - smoother with sin
    const time = Date.now() * 0.0006;
    const breathe = Math.sin(time + position[0] * 0.5) * 0.015 + 1;
    const targetScale = isActive ? 1.08 : hovered ? 1.04 : breathe;
    imageScale.current = THREE.MathUtils.lerp(imageScale.current, targetScale, clampedDelta * 3);

    // Gentle float
    groupRef.current.position.y =
      position[1] + Math.sin(time * 0.8 + position[0]) * 0.06;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group
        scale={[imageScale.current * scale, imageScale.current * scale, 1]}
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
        <Image
          url={image}
          transparent
          opacity={0.97}
          scale={[3, 3]}
          toneMapped={false}
        />

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

      {/* Title */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.35}
        color="#3d3226"
        anchorX="center"
        anchorY="top"
        fillOpacity={textOpacity.current}
        letterSpacing={0.15}
        font="https://fonts.gstatic.com/s/cormorantgaramond/v16/co3YmX5slCNuHLi8bLeY9MK7whWMhyjQEl5fsQ.woff2"
      >
        {title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -2.7, 0]}
        fontSize={0.12}
        color="#c9a96e"
        anchorX="center"
        anchorY="top"
        fillOpacity={textOpacity.current * 0.8}
        letterSpacing={0.3}
      >
        {subtitle.toUpperCase()}
      </Text>

      {/* Description */}
      <Text
        position={[0, -3.2, 0]}
        fontSize={0.13}
        color="#8a7b6b"
        anchorX="center"
        anchorY="top"
        fillOpacity={textOpacity.current * 0.7}
        maxWidth={3}
        textAlign="center"
        lineHeight={1.6}
      >
        {description}
      </Text>
    </group>
  );
};

export default JewelryPiece;
