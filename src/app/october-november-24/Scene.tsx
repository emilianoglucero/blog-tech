/* eslint-disable react/no-unknown-property */
import { AsciiRenderer, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'
import { Mesh } from 'three'

function Torusknot({
  position,
  ...props
}: { position: [number, number, number] } & JSX.IntrinsicElements['mesh']) {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta / 2
      ref.current.rotation.x = ref.current.rotation.y
    }
  })
  return (
    <mesh {...props} ref={ref} position={position}>
      <torusKnotGeometry attach="geometry" args={[1, 0.2, 128, 32]} />
      <meshStandardMaterial attach="material" color="red" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <color attach="background" args={['black']} />
      <ambientLight intensity={0.5} />
      <Torusknot position={[-2, 0, 0]} />
      <Torusknot position={[0, 0, 0]} />
      <Torusknot position={[2, 0, 0]} />
      <AsciiRenderer fgColor="white" bgColor="transparent" />
      <OrbitControls />
    </Canvas>
  )
}
