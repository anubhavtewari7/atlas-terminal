"use client"

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

function Earth({ risks, opportunities, autoRotate }) {
  const meshRef = useRef()
  const texture = useLoader(THREE.TextureLoader, '/earth.jpg')

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08
    }
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={texture} shininess={5} emissive="#ffffff" emissiveIntensity={0.1} />
        
        <mesh>
          <sphereGeometry args={[2.005, 32, 32]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.05} />
        </mesh>

        {/* RISK NODES (RED) */}
        {risks.map((node, i) => (
          <Marker key={`risk-${i}`} node={node} color="#ff3333" type="RISK" />
        ))}

        {/* OPPORTUNITY NODES (GREEN) */}
        {opportunities.map((node, i) => (
          <Marker key={`opp-${i}`} node={node} color="#10b981" type="OPPORTUNITY" />
        ))}
      </mesh>
    </group>
  )
}

function Marker({ node, color, type }) {
  const { lat, lng, title, hub } = node
  const [hovered, setHovered] = React.useState(false)
  
  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const radius = 2.03 
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ]
  }, [lat, lng])

  return (
    <mesh 
      position={position} 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      {/* CORE DOT — bigger and vivid */}
      <sphereGeometry args={[0.07, 16, 16]} />
      <meshBasicMaterial color={color} />
      
      {/* OUTER GLOW RING */}
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} />
      </mesh>

      {/* WIDE PULSE DISC */}
      <mesh scale={[8, 8, 8]}>
        <circleGeometry args={[0.07, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.DoubleSide} />
      </mesh>
      
      <Html distanceFactor={8} zIndexRange={[100, 0]}>
        <div className="pointer-events-none select-none">
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="flex flex-col bg-black/90 border-l-2 px-3 py-2 shadow-2xl rounded-r-lg" 
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                <span className="text-white text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                  {type === 'OPPORTUNITY' ? hub : title}
                </span>
              </div>
              {type === 'OPPORTUNITY' && (
                <div className="text-[9px] font-mono mt-1" style={{ color }}>
                  {title}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Html>
    </mesh>
  )
}

export default function Globe({ risks = [], opportunities = [], autoRotate = true }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows antialias="true">
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} intensity={4} color="#ffffff" />
        <pointLight position={[-10, 10, 5]} intensity={2} color="#38bdf8" />
        
        <React.Suspense fallback={<Html center><div className="text-sky-400 font-mono text-[10px] animate-pulse">SYNCING_MAP...</div></Html>}>
          <Earth risks={risks} opportunities={opportunities} autoRotate={autoRotate} />
        </React.Suspense>
        
        <OrbitControls enablePan={false} minDistance={3} maxDistance={12} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
