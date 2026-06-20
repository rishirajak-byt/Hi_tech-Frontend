"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, MeshTransmissionMaterial, Sparkles, Box, Icosahedron, Torus } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <Icosahedron args={[1.5, 0]} position={[-3, 1, 0]}>
          <MeshTransmissionMaterial
            backside
            samples={2}
            thickness={0.5}
            chromaticAberration={0.5}
            anisotropy={0.3}
            distortion={0.5}
            distortionScale={0.5}
            temporalDistortion={0.1}
            iridescence={1}
            iridescenceIOR={1}
            iridescenceThicknessRange={[0, 1400]}
            color="#F4A300"
            resolution={512}
          />
        </Icosahedron>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <Torus args={[1.2, 0.4, 24, 48]} position={[3, -1, 1]}>
          <MeshTransmissionMaterial
            backside
            samples={2}
            thickness={0.5}
            chromaticAberration={0.8}
            distortion={0.2}
            color="#C8102E"
            resolution={512}
          />
        </Torus>
      </Float>

      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <Box args={[1.5, 1.5, 1.5]} position={[0, -2.5, -2]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={1}
            chromaticAberration={0.3}
            color="#ffffff"
            roughness={0.1}
            metalness={0.1}
          />
        </Box>
      </Float>

      <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
        <Icosahedron args={[0.6, 0]} position={[-2, -2, 2]}>
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.2}
            color="#1A3C6E"
          />
        </Icosahedron>
      </Float>
    </group>
  );
}

function Particles() {
  const count = 500;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Hero3D() {
  if (typeof window === "undefined") return <div className="absolute inset-0 bg-[#0a1930]" />;

  return (
    <div className="absolute inset-0 z-0 opacity-100 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#0a1930']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#F4A300" />
        <spotLight position={[0, 10, 0]} intensity={2} color="#C8102E" angle={0.5} penumbra={1} />

        <FloatingShapes />
        <Particles />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} intensity={1.5} />
        </EffectComposer>

        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
