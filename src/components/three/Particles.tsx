import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Particles = ({ count = 120 }: { count?: number }) => {
  const mesh = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
      vel[i * 3] = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = Math.random() * 0.002 + 0.001;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, [count]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const geo = mesh.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3] * delta * 60;
      arr[i * 3 + 1] += velocities[i * 3 + 1] * delta * 60;
      arr[i * 3 + 2] += velocities[i * 3 + 2] * delta * 60;

      // Reset if too far
      if (arr[i * 3 + 1] > 12) {
        arr[i * 3 + 1] = -12;
      }
    }
    posAttr.needsUpdate = true;

    // Shimmer opacity
    if (materialRef.current) {
      materialRef.current.opacity = 0.25 + Math.sin(Date.now() * 0.001) * 0.08;
    }

    mesh.current.rotation.y += delta * 0.003;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.035}
        color="#c9a96e"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Particles;
