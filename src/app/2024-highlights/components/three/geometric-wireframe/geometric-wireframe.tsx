/* eslint-disable react/no-unknown-property */
import { Float } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { Mesh } from 'three'

import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { gsap } from '~/lib/gsap'

import { Sphere } from '../sphere'

gsap.registerPlugin(ScrollTrigger)

interface GeometricWireframeProps {
  triggerRef: React.RefObject<HTMLElement>
  [key: string]: any
}

export const GeometricWireframe = ({ triggerRef }: GeometricWireframeProps) => {
  const meshRef = useRef<Mesh>(null)

  useIsomorphicLayoutEffect(() => {
    if (!meshRef.current || !triggerRef.current) {
      console.warn('Missing refs for animation')
      return
    }

    gsap.to(meshRef.current?.rotation, {
      y: Math.PI,
      x: Math.PI / 2,
      z: Math.PI,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top-=20% top',
        end: '+=130%',
        scrub: 0.2
      }
    })
  }, [triggerRef])

  return (
    <group
      scale={[0.5, 0.7, 0.5]}
      rotation={[0.45, 0.3, 0.2]}
      position={[4, 2, -3]}
    >
      <mesh scale={[9, 9, 9]}>
        <boxGeometry args={[1.5, 1, 0.5, 2, 1, 2]} />
        <meshBasicMaterial color="#262626" wireframe />
      </mesh>
      <Float speed={1.4} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh scale={[1, 1, 1]} ref={meshRef}>
          <sphereGeometry args={[1, 2, 3]} />
          <meshBasicMaterial color="#262626" wireframe />
        </mesh>
        <Sphere
          color="#262626"
          amount={30}
          emissive="#42ff00"
          position={[0, 0, 0]}
        />
      </Float>
    </group>
  )
}
