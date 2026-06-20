"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

export default function LoginBackground3D() {
  if (typeof window === "undefined") return null;

  return (
    <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#F4A300" />
        <directionalLight position={[-5, -5, -5]} intensity={1} color="#C8102E" />
        <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[2, 64, 64]} position={[2, 0, -2]} scale={1.5}>
            <MeshDistortMaterial
              color="#1A3C6E"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.1}
              metalness={0.8}
            />
          </Sphere>
        </Float>
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Sphere args={[1.5, 32, 32]} position={[-2, 2, -4]} scale={1.2}>
            <MeshDistortMaterial
              color="#F4A300"
              attach="material"
              distort={0.3}
              speed={1.5}
              roughness={0.2}
              metalness={0.5}
            />
          </Sphere>
        </Float>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
