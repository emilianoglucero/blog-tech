import {
  ScrollScene,
  styles,
  UseCanvas,
  useScrollRig
} from '@14islands/r3f-scroll-rig'
import { Float } from '@react-three/drei'
import { ScrollTrigger } from 'gsap/all'
import Image from 'next/image'
import { Suspense, useMemo, useRef } from 'react'
import { Mesh } from 'three'
import * as THREE from 'three'

import { AspectBox } from '~/components/aspect-box'
import { Cell } from '~/components/grid/cell'
import { Row } from '~/components/grid/row'
import useIsomorphicLayoutEffect from '~/hooks/use-isomorphic-layout'
import { gsap } from '~/lib/gsap'

import { GeometricWireframe } from '../three/geometric-wireframe/geometric-wireframe'
import { LineExplosion } from '../three/line-explosion/line-explosion'
import s from './books-list.module.css'

gsap.registerPlugin(ScrollTrigger)

interface ListItem {
  title: string
  author?: string
  description?: string
  url?: string
  decoration?: string
}

interface BooksListProps {
  title: string
  subtitle?: string
  items: ListItem[]
  image: {
    url: string
    alt: string
    width: number
    height: number
  }
  webglType?: 'line-explosion' | 'geometric-wireframe'
  contentPosition?: {
    start: number
    end: number
    mobileSpan?: number
    order?: number
    align?: 'start' | 'center' | 'end'
  }
  imagePosition?: {
    start: number
    end: number
    mobileSpan?: number
    order?: number
  }
}

// const WebGLBox = (props: any) => {
//   const meshRef = useRef<Mesh>(null)
//   useIsomorphicLayoutEffect(() => {
//     const trigger = document.getElementById('extra')
//     if (!meshRef.current) return
//     gsap.to(meshRef.current?.rotation, {
//       y: Math.PI,
//       x: Math.PI / 2,
//       z: Math.PI,
//       ease: 'power2.inOut',
//       scrollTrigger: {
//         trigger: trigger,
//         start: 'top-=20% top',
//         end: 'bottom bottom',
//         scrub: 0.2
//       }
//     })
//   }, [])
//   return (
//     <group
//       {...props}
//       scale={[0.5, 0.7, 0.5]}
//       rotation={[0.45, 0.3, 0.2]}
//       position={[4, -0.5, -3]}
//     >
//       <mesh scale={[9, 9, 9]}>
//         <boxGeometry args={[1.5, 1, 0.5, 2, 1, 2]} />
//         <meshBasicMaterial color="#262626" wireframe />
//       </mesh>
//       <Float speed={1.4} rotationIntensity={1.5} floatIntensity={1.5}>
//         <mesh scale={[1, 1, 1]} ref={meshRef}>
//           <sphereGeometry args={[1, 2, 3]} />
//           <meshBasicMaterial color="#262626" wireframe />
//         </mesh>
//       </Float>
//     </group>
//   )
// }

// const WebGLJoint = () => {
//   const meshRef = useRef<Mesh>(null)
//   useIsomorphicLayoutEffect(() => {
//     const trigger = document.getElementById('podcasts')
//     if (!meshRef.current) return
//     meshRef.current.scale.set(0.5, 0.5, 0.5)
//     gsap.to(meshRef.current.scale, {
//       x: 2,
//       y: 2,
//       z: 2,
//       scrollTrigger: {
//         trigger: trigger,
//         start: 'top-=10% top',
//         end: 'bottom+=10% bottom',
//         scrub: 0.4,
//         markers: true
//       }
//     })
//   }, [])
//   const geometry = useMemo(() => {
//     const points: number[] = []
//     const numLines = 200 // Number of lines to create

//     for (let i = 0; i < numLines; i++) {
//       // Create a random point near the center
//       const centerOffset = 0.3
//       const centerX = (Math.random() - 0.5) * centerOffset
//       const centerY = (Math.random() - 0.5) * centerOffset
//       const centerZ = (Math.random() - 0.5) * centerOffset

//       // Create a random direction for the line
//       const angle1 = Math.random() * Math.PI * 2
//       const angle2 = Math.random() * Math.PI * 2

//       // Random length for the line
//       const length = 1 + Math.random() * 2

//       // Calculate end points
//       const x2 = centerX + Math.cos(angle1) * Math.sin(angle2) * length
//       const y2 = centerY + Math.sin(angle1) * Math.sin(angle2) * length
//       const z2 = centerZ + Math.cos(angle2) * length

//       // Add both points to create the line
//       points.push(centerX, centerY, centerZ)
//       points.push(x2, y2, z2)
//     }

//     const geometry = new THREE.BufferGeometry()
//     geometry.setAttribute(
//       'position',
//       new THREE.Float32BufferAttribute(points, 3)
//     )
//     return geometry
//   }, [])

//   return (
//     <group
//       ref={meshRef}
//       rotation={[
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       ]}
//       position={[3, 0, 0]}
//       //   scale={[2, 2, 2]}
//     >
//       <Float speed={1} rotationIntensity={1} floatIntensity={1}>
//         <lineSegments geometry={geometry}>
//           <lineBasicMaterial
//             color="#262626"
//             transparent
//             opacity={0.6}
//             linewidth={1}
//           />
//         </lineSegments>
//       </Float>
//     </group>
//   )
// }

export const BooksList = ({
  title,
  subtitle,
  items,
  image,
  webglType = 'geometric-wireframe'
}: BooksListProps) => {
  const trackedElement = useRef(null!)
  const imgRef = useRef(null!)
  const { hasSmoothScrollbar } = useScrollRig()

  const renderWebGLComponent = (props: any) => {
    switch (webglType) {
      case 'line-explosion':
        return <LineExplosion {...props} triggerRef={trackedElement} />
      case 'geometric-wireframe':
      default:
        return <GeometricWireframe {...props} triggerRef={trackedElement} />
    }
  }

  return (
    <div className={s.container}>
      <Row>
        <Cell start={1} end={24} mobileSpan={8} className={s.content}>
          <div
            className={`${s.imageContainer} ${styles.hiddenWhenSmooth}`}
            ref={trackedElement}
          >
            <AspectBox ratio={16 / 9}>
              <Image src={image.url} alt={image.alt} ref={imgRef} fill />
            </AspectBox>
          </div>

          <div className={s.overlay}>
            <h2 className={s.title}>{title}</h2>
            {subtitle && <p className={s.subtitle}>{subtitle}</p>}

            <ul className={s.list}>
              {items.map((item, index) => (
                <li key={index} className={s.listItem}>
                  {item.url ? (
                    <>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className={s.decoration}>{item.decoration}</span>
                        {item.title}
                      </a>
                      {item.author && <span> by {item.author}</span>}
                    </>
                  ) : (
                    <>
                      <h3>{item.title}</h3>
                      {item.author && <span> by {item.author}</span>}
                    </>
                  )}
                  {item.description && (
                    <p className={s.description}>{item.description}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {hasSmoothScrollbar && (
            <UseCanvas>
              <ScrollScene track={trackedElement}>
                {(props) => (
                  <Suspense fallback={null}>
                    {renderWebGLComponent(props)}
                  </Suspense>
                )}
              </ScrollScene>
            </UseCanvas>
          )}
        </Cell>
      </Row>
    </div>
  )
}
