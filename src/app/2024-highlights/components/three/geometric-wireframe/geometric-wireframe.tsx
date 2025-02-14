/* eslint-disable react/no-unknown-property */
import { useGSAP } from '@gsap/react'
import { Float } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/all'
import { useRef } from 'react'
import { Mesh } from 'three'

import { gsap } from '~/lib/gsap'

import { Sphere } from '../sphere'

gsap.registerPlugin(ScrollTrigger)

interface GeometricWireframeProps {
  triggerRef: React.RefObject<HTMLElement>
  [key: string]: any
}

export const GeometricWireframe = ({ triggerRef }: GeometricWireframeProps) => {
  const smallGeometryRef = useRef<Mesh>(null)
  const largeGeometryRef = useRef<Mesh>(null)
  const mm = gsap.matchMedia()

  useGSAP(() => {
    const mediaQueryContext = mm.add(
      {
        isLargeScreen: '(min-width: 1500px)',
        isMediumScreen: '(max-width: 1499px)'
      },
      (context) => {
        const conditions = context.conditions as {
          isLargeScreen: boolean
          isMediumScreen: boolean
        }
        if (
          !smallGeometryRef.current ||
          !triggerRef.current ||
          !largeGeometryRef.current
        ) {
          console.warn('Missing refs for animation')
          return
        }

        // Initial state
        largeGeometryRef.current.scale.set(0, 0, 0)
        largeGeometryRef.current.rotation.set(0.8, 0, 0.8)

        const largeGeometryTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: triggerRef.current,
            start: conditions.isLargeScreen ? 'top-=100% top' : 'top-=60% top',
            end: '+=80%',
            scrub: 2
          }
        })

        // Add animations to the large geometry timeline
        largeGeometryTimeline
          .to(largeGeometryRef.current.scale, {
            x: 9,
            y: 9,
            z: 9,
            ease: 'power2.inOut'
          })
          .to(
            largeGeometryRef.current.rotation,
            {
              x: 0,
              y: 0,
              z: 0,
              ease: 'power2.inOut'
            },
            0
          )
          .to(
            smallGeometryRef.current.rotation,
            {
              y: Math.PI,
              x: Math.PI / 2,
              z: Math.PI,
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: triggerRef.current,
                start: conditions.isLargeScreen
                  ? 'top-=100% top'
                  : 'top-=40% top',
                end: conditions.isLargeScreen ? '+=200%' : '+=170%',
                scrub: 0.2
              }
            },
            0
          )

        return () => {
          largeGeometryTimeline.kill()
          largeGeometryTimeline.scrollTrigger?.kill()
        }
      },
      // Add initial states
      {
        isLargeScreen: window.matchMedia('(min-width: 1500px)').matches,
        isMediumScreen: window.matchMedia('(max-width: 1499px)').matches
      }
    )

    return () => {
      mediaQueryContext.kill()
    }
  }, [triggerRef])

  return (
    <group
      scale={[0.5, 0.7, 0.5]}
      rotation={[0.45, 0.3, 0.2]}
      position={[4, 0, -3]}
    >
      <mesh ref={largeGeometryRef}>
        <boxGeometry args={[1.5, 1, 0.5, 2, 1, 2]} />
        <meshBasicMaterial color="#262626" wireframe />
      </mesh>
      <Float speed={1.4} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh scale={[1, 1, 1]} ref={smallGeometryRef}>
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
