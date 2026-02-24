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
}

const JewelryPiece = ({
  position,
  image,
  title,
  subtitle,
  description,
  rotation = [0, 0, 0],
  scale = 2.5,
}: JewelryPieceProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { camera } = useThree();
  const textOpacity = useRef(0);
  const imageScale = useRef(1);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Calculate distance from camera to piece
    const dist = camera.position.distanceTo(
      new THREE.Vector3(...position)
    );

    // Text fades in when camera is close
    const targetOpacity = dist < 6 ? Math.max(0, 1 - (dist - 3) / 3) : 0;
    textOpacity.current = THREE.MathUtils.lerp(
      textOpacity.current,
      targetOpacity,
      delta * 2
    );

    // Subtle breathing animation
    const breathe = Math.sin(Date.now() * 0.0008) * 0.02 + 1;
    imageScale.current = THREE.MathUtils.lerp(
      imageScale.current,
      hovered ? 1.05 : breathe,
      delta * 2
    );

    // Gentle float
    groupRef.current.position.y =
      position[1] + Math.sin(Date.now() * 0.0005 + position[0]) * 0.08;
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
    >
      {/* Jewelry image plane */}
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
      >
        <Image
          url={image}
          transparent
          opacity={0.95}
          scale={[3, 3]}
          toneMapped={false}
        />

        {/* Subtle glow behind image */}
        <mesh position={[0, 0, -0.1]}>
          <planeGeometry args={[3.5, 3.5]} />
          <meshBasicMaterial
            color="#c9a96e"
            transparent
            opacity={hovered ? 0.08 : 0.03}
          />
        </mesh>
      </group>

      {/* Title - appears on proximity */}
      <Text
        position={[0, -2.2, 0]}
        fontSize={0.35}
        color="#3d3226"
        anchorX="center"
        anchorY="top"
        fillOpacity={textOpacity.current}
        letterSpacing={0.15}
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
