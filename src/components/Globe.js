"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function Earth({ risks }) {
  const meshRef = useRef()
  
  // Rotate the globe
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1
  })

  return (
    <group ref={meshRef}>
      {/* Main Wireframe Globe */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial 
          color="#38bdf8" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </mesh>

      {/* Inner Glow Sphere */}
      <mesh>
        <sphereGeometry args={[1.98, 32, 32]} />
        <meshBasicMaterial 
          color="#0ea5e9" 
          transparent 
          opacity={0.05} 
        />
      </mesh>

      {/* Risk Points (Data Clusters) */}
      {risks.map((risk, i) => (
        <RiskPoint key={i} lat={risk.lat} lng={risk.lng} severity={risk.severity} />
      ))}
    </group>
  )
}

function RiskPoint({ lat, lng, severity }) {
  // Convert lat/lng to 3D coordinates
  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const radius = 2
    
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ]
  }, [lat, lng])

  const color = severity === 'high' ? '#ef4444' : '#f59e0b'

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} />
        
        {/* Glow Ring */}
        <mesh scale={[2.5, 2.5, 2.5]}>
          <circleGeometry args={[0.05, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
        </mesh>
      </mesh>
    </Float>
  )
}

export default function Globe({ risks = [] }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Earth risks={risks} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          minDistance={3} 
          maxDistance={10} 
          autoRotate={false}
        />
      </Canvas>
    </div>
  )
}
