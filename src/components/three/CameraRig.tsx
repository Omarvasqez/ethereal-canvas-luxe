import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Camera rig that moves through the scene based on scroll position.
 * The camera follows a path through the 3D space, creating a 
 * cinematic exploration experience.
 */
const CameraRig = () => {
  const { camera } = useThree();
  const scrollProgress = useRef(0);
  const targetProgress = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  // Camera path waypoints
  const waypoints = [
    { pos: new THREE.Vector3(0, 0, 10), look: new THREE.Vector3(0, 0, 0) },
    { pos: new THREE.Vector3(0, 0, 4), look: new THREE.Vector3(0, 0, 0) },
    { pos: new THREE.Vector3(3, 0.5, 0), look: new THREE.Vector3(8, 0, -6) },
    { pos: new THREE.Vector3(8, 0.5, -4), look: new THREE.Vector3(8, 0, -6) },
    { pos: new THREE.Vector3(-5, 0.5, -8), look: new THREE.Vector3(-8, 0, -12) },
    { pos: new THREE.Vector3(-8, 0.5, -10), look: new THREE.Vector3(-8, 0, -12) },
    { pos: new THREE.Vector3(0, 1, -18), look: new THREE.Vector3(0, 0, -22) },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const scrollSpeed = 0.0008;
      targetProgress.current = Math.max(
        0,
        Math.min(1, targetProgress.current + e.deltaY * scrollSpeed)
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    // Touch support
    let lastTouchY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const deltaY = lastTouchY - e.touches[0].clientY;
      lastTouchY = e.touches[0].clientY;
      targetProgress.current = Math.max(
        0,
        Math.min(1, targetProgress.current + deltaY * 0.002)
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useFrame((_, delta) => {
    // Smooth interpolation with inertia
    scrollProgress.current = THREE.MathUtils.lerp(
      scrollProgress.current,
      targetProgress.current,
      delta * 1.8
    );

    const t = scrollProgress.current;
    const totalSegments = waypoints.length - 1;
    const segment = Math.min(
      Math.floor(t * totalSegments),
      totalSegments - 1
    );
    const segmentT = (t * totalSegments - segment);

    const current = waypoints[segment];
    const next = waypoints[Math.min(segment + 1, totalSegments)];

    // Smooth position
    const targetPos = new THREE.Vector3().lerpVectors(
      current.pos,
      next.pos,
      segmentT
    );

    // Add subtle mouse parallax
    targetPos.x += mouseX.current * 0.15;
    targetPos.y += -mouseY.current * 0.08;

    camera.position.lerp(targetPos, delta * 4);

    // Smooth look-at
    const lookTarget = new THREE.Vector3().lerpVectors(
      current.look,
      next.look,
      segmentT
    );

    // Create a temp camera to get target quaternion
    const tempMatrix = new THREE.Matrix4().lookAt(
      camera.position,
      lookTarget,
      new THREE.Vector3(0, 1, 0)
    );
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(tempMatrix);
    camera.quaternion.slerp(targetQuat, delta * 3);
  });

  return null;
};

export default CameraRig;
