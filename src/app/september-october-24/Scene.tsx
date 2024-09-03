'use client'

import { AsciiRenderer, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'

function Torusknot({ position, ...props }) {
  const ref = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame(
    (state, delta) =>
      (ref.current.rotation.x = ref.current.rotation.y += delta / 2)
  )
  return (
    <mesh
      position={position}
      scale={Math.min(viewport.width, viewport.height) / 5}
      {...props}
      ref={ref}
    >
      <torusKnotGeometry args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.5} />
      {/* <pointLight position={[10, 10, 10]} /> */}
      <Torusknot position={[-2, 0, 0]} />
      <Torusknot position={[0, 0, 0]} />
      <Torusknot position={[2, 0, 0]} />
      <AsciiRenderer fgColor="white" bgColor="transparent" />
      <OrbitControls />
    </Canvas>
  )
}
