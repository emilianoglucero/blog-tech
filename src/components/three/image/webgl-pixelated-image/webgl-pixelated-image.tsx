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
    uPrevMouse: new THREE.Vector2(),
    uBrightness: 1.0,
    uContrast: 1.1,
    uOffsetFactor: 3
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
  const [isLeaving, setIsLeaving] = useState(false)
  const [lastUpdateTime, setLastUpdateTime] = useState(0)
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
    setIsLeaving(false)
  }

  const handleMouseLeave = () => {
    setEaseFactor(0.002)
    setIsLeaving(true)
  }

  useFrame((state) => {
    if (!meshRef.material) return null

    // Handle mouse position interpolation
    setMousePosition((prev) => ({
      x: prev.x + (targetMousePosition.x - prev.x) * easeFactor,
      y: prev.y + (targetMousePosition.y - prev.y) * easeFactor
    }))

    // Update material uniforms
    meshRef.material.uMouse.set(mousePositon.x, mousePositon.y)
    meshRef.material.uPrevMouse.set(prevMousePosition.x, prevMousePosition.y)

    // Handle ease factor and offset factor increment when leaving
    if (isLeaving) {
      const currentTime = state.clock.getElapsedTime()
      if (currentTime - lastUpdateTime >= 0.016) {
        // Run every frame (~60fps)
        setEaseFactor((prev) => Math.min(prev + 0.002, 0.1))
        // Gradually decrease the offset factor with a smoother reduction
        meshRef.material.uOffsetFactor = Math.max(
          meshRef.material.uOffsetFactor * 0.95, // More gradual reduction
          2 // minimum offset factor
        )
        setLastUpdateTime(currentTime)
      }
    } else {
      // Reset offset factor when entering (moved outside the time check)
      meshRef.material.uOffsetFactor = 3
    }
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
        // eslint-disable-next-line react/no-unknown-property
        uBrightness={1.2}
        // eslint-disable-next-line react/no-unknown-property
        uContrast={1}
        // eslint-disable-next-line react/no-unknown-property
        uOffsetFactor={3}
      />
    </mesh>
  )
}
