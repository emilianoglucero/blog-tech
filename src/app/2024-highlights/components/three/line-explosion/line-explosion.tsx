/* eslint-disable react/no-unknown-property */
import { Float } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/all'
import { useMemo, useRef } from 'react'
import { Group } from 'three'
import * as THREE from 'three'

import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { EASE, gsap } from '~/lib/gsap'

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
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top-=50% top',
        end: '+=120%',
        toggleActions: 'play none none none'
      },
      ease: EASE
    })
    meshRef.current.scale.set(0.5, 0.5, 0.5)
    meshRef.current.position.set(15, 5, 0)
    meshRef.current.rotation.set(-25, -10, -30)
    timeline.to(
      meshRef.current.scale,
      {
        x: 2,
        y: 2,
        z: 2,
        duration: 2
      },
      0
    )
    timeline.to(
      meshRef.current.position,
      {
        x: 3,
        y: 0,
        z: 0,
        duration: 2.6
      },
      0
    )
    timeline.to(
      meshRef.current.rotation,
      {
        x: 0,
        y: 0,
        z: 0,
        ease: 'elastic.out(0.5, 0.3)',
        duration: 3.6
      },
      0
    )
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
    <group ref={meshRef}>
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
