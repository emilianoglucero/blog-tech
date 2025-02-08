import { useImageAsTexture } from '@14islands/r3f-scroll-rig'
import { shaderMaterial } from '@react-three/drei'
import { extend, useFrame } from '@react-three/fiber'
import { useState } from 'react'
import * as THREE from 'three'

import { pixelatedEffect } from '~/lib/shaders/effects/pixelation'

interface WebPixelatedImageProps {
  imgRef: React.RefObject<HTMLImageElement>
  easeFactorValue: number
}

const CustomMaterial = shaderMaterial(
  {
    uTexture: null,
    uMouse: new THREE.Vector2(),
    uPrevMouse: new THREE.Vector2()
  },
  pixelatedEffect.vertex,
  pixelatedEffect.fragment
)
extend({ CustomMaterial })

export const WebglPixelatedImage = ({
  imgRef,
  easeFactorValue,
  ...props
}: WebPixelatedImageProps) => {
  const [easeFactor, setEaseFactor] = useState(easeFactorValue)
  const [meshRef, setMeshRef] = useState<any>(null)
  // the mouse position coordinates at different states
  // it's initiallized to start from the center
  const [mousePositon, setMousePosition] = useState({ x: 0.5, y: 0.5 })
  const [targetMousePosition, setTargetMousePostion] = useState({
    x: 0.5,
    y: 0.5
  })
  const [prevMousePosition, setPrevMousePosition] = useState({
    x: 0.5,
    y: 0.5
  })
  const texture = useImageAsTexture(imgRef)

  const handleMouseMove = (event: any) => {
    // console.log(event)  all the properties  onPointerMove provides like type: pointerMove, srcElement: h1

    if (!meshRef?.material) return
    setEaseFactor(easeFactorValue)
    // access to the uv coordinates, return a vec2
    const x = event.uv!.x
    const y = event.uv!.y
    // it set the previous uv frame value stored
    setPrevMousePosition({ ...targetMousePosition })
    // it sets the current uv value
    setTargetMousePostion({ x, y })
  }

  const handleMouseEnter = (event: any) => {
    // Set all mouse positions to the current entry point
    const x = event.uv!.x
    const y = event.uv!.y
    setMousePosition({ x, y })
    setTargetMousePostion({ x, y })
    setPrevMousePosition({ x, y })
    setEaseFactor(0.005)
  }

  const handleMouseLeave = () => {
    setEaseFactor(0.002)
  }

  useFrame(() => {
    if (!meshRef.material) return null
    setMousePosition((prev) => ({
      x: prev.x + (targetMousePosition.x - prev.x) * easeFactor,
      y: prev.y + (targetMousePosition.y - prev.y) * easeFactor
    }))
    meshRef.material.uMouse.set(mousePositon.x, mousePositon.y)
    meshRef.material.uPrevMouse.set(prevMousePosition.x, prevMousePosition.y)
  })

  if (!texture) return null
  return (
    <mesh
      {...props}
      ref={setMeshRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <planeGeometry />
      {/* @ts-ignore */}
      <customMaterial
        // eslint-disable-next-line react/no-unknown-property
        uTexture={texture}
        // eslint-disable-next-line react/no-unknown-property
        uMouse={new THREE.Vector2()}
        // eslint-disable-next-line react/no-unknown-property
        uPrevMouse={new THREE.Vector2()}
      />
    </mesh>
  )
}
