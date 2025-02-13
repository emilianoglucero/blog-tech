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
  const mainMeshRef = useRef<Mesh>(null)

  useIsomorphicLayoutEffect(() => {
    if (!meshRef.current || !triggerRef.current || !mainMeshRef.current) {
      console.warn('Missing refs for animation')
      return
    }

    mainMeshRef.current.scale.set(0, 0, 0)
    mainMeshRef.current.rotation.set(0.3, 0, 0.3)

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top-=80% top',
        end: '+=100%',
        scrub: 0.2
      }
    })
    timeline
      .to(
        meshRef.current.rotation,
        {
          y: Math.PI,
          x: Math.PI / 2,
          z: Math.PI,
          ease: 'power2.inOut'
        },
        0
      )
      .to(
        mainMeshRef.current.scale,
        {
          x: 9,
          y: 9,
          z: 9,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: triggerRef.current,
            start: 'top-=140% top',
            end: '+=100%',
            scrub: 2
          }
        },
        0
      )
      .to(
        mainMeshRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0
        },
        0
      )
  }, [triggerRef])

  return (
    <group
      scale={[0.5, 0.7, 0.5]}
      rotation={[0.45, 0.3, 0.2]}
      position={[4, 0, -3]}
    >
      <mesh ref={mainMeshRef}>
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
