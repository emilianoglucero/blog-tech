/* eslint-disable react/no-unknown-property */
import { Float } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/all'
import { useMemo, useRef } from 'react'
import { Group } from 'three'
import * as THREE from 'three'

import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { gsap } from '~/lib/gsap'

import { Sphere } from '../sphere'

gsap.registerPlugin(ScrollTrigger)

interface LineExplosionProps {
  triggerRef: React.RefObject<HTMLElement>
  [key: string]: any
}

export const LineExplosion = ({ triggerRef }: LineExplosionProps) => {
  const meshRef = useRef<Group>(null)

  useIsomorphicLayoutEffect(() => {
    if (!meshRef.current || !triggerRef.current) {
      console.warn('Missing refs for animation')
      return
    }

    meshRef.current.scale.set(0.5, 0.5, 0.5)
    gsap.to(meshRef.current.scale, {
      x: 2,
      y: 2,
      z: 2,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top-=10% top',
        end: '+=120%',
        scrub: 0.4
      }
    })
  }, [triggerRef])

  const geometry = useMemo(() => {
    const points: number[] = []
    const numLines = 200

    for (let i = 0; i < numLines; i++) {
      const centerOffset = 0.3
      const centerX = (Math.random() - 0.5) * centerOffset
      const centerY = (Math.random() - 0.5) * centerOffset
      const centerZ = (Math.random() - 0.5) * centerOffset

      const angle1 = Math.random() * Math.PI * 2
      const angle2 = Math.random() * Math.PI * 2
      const length = 1 + Math.random() * 2

      const x2 = centerX + Math.cos(angle1) * Math.sin(angle2) * length
      const y2 = centerY + Math.sin(angle1) * Math.sin(angle2) * length
      const z2 = centerZ + Math.cos(angle2) * length

      points.push(centerX, centerY, centerZ)
      points.push(x2, y2, z2)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(points, 3)
    )
    return geometry
  }, [])

  return (
    <group
      ref={meshRef}
      rotation={[
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ]}
      position={[3, 2, 0]}
    >
      <Float speed={1} rotationIntensity={1} floatIntensity={1}>
        <lineSegments geometry={geometry}>
          <lineBasicMaterial
            color="#262626"
            transparent
            opacity={0.6}
            linewidth={1}
          />
          <Sphere
            color="#262626"
            amount={30}
            emissive="#42ff00"
            position={[0, 0, 0]}
            size={0.06}
          />
        </lineSegments>
      </Float>
    </group>
  )
}
