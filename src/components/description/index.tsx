// index.tsx
import { AsciiRenderer, Center, Text3D } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { BallCollider, Physics, RigidBody } from '@react-three/rapier'
import { useEffect, useRef, useState } from 'react'
// import { suspend } from 'suspend-react'
import * as THREE from 'three'

import welcomeStyles from '../../app/sections/welcome/welcome.module.css'

const bitter = './assets/fonts/Fira_Sans_Light_Regular.json'

const Description = () => {
  const cameraDistance = 600
  const cameraFov =
    Math.atan(window.innerHeight / 2 / cameraDistance) * (180 / Math.PI) * 2

  const descriptionRef = document.querySelector(
    `.${welcomeStyles.description} span`
  )
  console.log('descriptionRef', descriptionRef)

  const bounds = descriptionRef?.getBoundingClientRect()
  console.log('bounds', bounds)

  const [descriptionPosition, setDescriptionPosition] = useState({ x: 0, y: 0 })
  // Function to update descriptionPosition
  const updateDescriptionPosition = () => {
    const descriptionRef = document.querySelector(
      `.${welcomeStyles.description} span`
    )
    if (descriptionRef) {
      const bounds = descriptionRef.getBoundingClientRect()
      setDescriptionPosition({
        y: -bounds.top + window.innerHeight / 2 - bounds.height / 2,
        x:
          bounds.left -
          window.innerWidth / 2 +
          bounds.width / 2 -
          bounds.width / 2
      })
    }
  }

  useEffect(() => {
    // Update position on mount and when window size changes
    updateDescriptionPosition()
    const handleResize = () => {
      updateDescriptionPosition()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  console.log('descriptionPosition x', descriptionPosition.x)
  console.log('descriptionPosition y', descriptionPosition.y)
  const [down, set] = useState(true)
  return (
    <Canvas
      flat
      onPointerDown={() => set(true)}
      onPointerUp={() => set(false)}
      camera={{ position: [0, 0, cameraDistance], fov: cameraFov }}
      // background="#e7e7e7"
    >
      <color args={['#e7e7e7']} attach="background" />
      <Physics gravity={[0, 0, 0]}>
        <Pointer size={10} down={down} />

        <Text x={descriptionPosition.x} y={descriptionPosition.y}>
          writings, explorations and stuff.
        </Text>
      </Physics>
    </Canvas>
  )
}

const Text = ({ font, children, margin = 3.8, space = 5, y, x }) => {
  const widths = [...children].map((char) => (char === ' ' ? space : 0))
  return [...children].map((char, index) =>
    char === ' ' ? null : (
      <Center
        right
        top
        onCentered={({ container, width }) => {
          const widthSlice = widths.slice(0, index)
          // Use the `x` prop to offset the initial position along the x-axis
          const initialXPosition =
            widthSlice.reduce((prev, cur) => cur + prev, 0) + x
          container.position.set(
            initialXPosition,
            y + ('gypj,'.includes(char) ? -3.3 : 0),
            0
          )
          // "kerning" adjustments
          if ('fvril'.includes(char)) width = width * 0.85
          if ('Pw'.includes(char)) width = width * 0.95
          widths[index] = width + margin
        }}
      >
        <Char font={font} index={index} key={index}>
          {char}
        </Char>
      </Center>
    )
  )
}

function Char({ index, font = bitter, children, ...props }) {
  const api = useRef()
  const ref = useRef()
  const vec = new THREE.Vector3()
  const ang = new THREE.Vector3()
  const rot = new THREE.Vector3()
  useFrame((delta) => {
    delta = Math.min(0.1, delta)
    if (!api.current) return
    api.current.applyImpulse(
      // Apply a force to the character to make it float and return to its original position
      vec.copy(ref.current.parent.position).negate().multiplyScalar(1.1)
    )
    ang.copy(api.current.angvel())
    rot.copy(api.current.rotation())
    api.current.setAngvel({ x: ang.x, y: ang.y, z: ang.z - rot.z })
  })
  // const textOptions = useControls('Text', {
  //   size: { value: 11, min: 1, max: 100, step: 1 },
  //   height: { value: 0.1, min: -1, max: 1, step: 0.1 },
  //   curveSegments: { value: 1, min: -1, max: 24, step: 1 },
  //   bevelEnabled: { value: false },
  //   bevelThickness: { value: 10, min: -1, max: 100, step: 0.1 },
  //   bevelSize: { value: 8, min: -1, max: 100, step: 0.1 },
  //   bevelOffset: { value: 0, min: -10, max: 10, step: 0.1 }
  // })
  const textOptions = {
    size: 11,
    height: 0.1
  }
  return (
    <RigidBody
      ref={api}
      enabledTranslations={[true, true, false]}
      enabledRotations={[false, false, true]}
      linearDamping={6}
      angularDamping={4}
      restitution={0}
      colliders="hull"
      {...props}
    >
      <Text3D
        ref={ref}
        material-color="#27272a" // Set custom color here
        // font={suspend(font).default}
        font={font}
        // size={12}
        {...textOptions}
      >
        {children}
      </Text3D>
    </RigidBody>
  )
}

function Pointer({ size, down }) {
  const ref = useRef()
  // useFrame(({ pointer, viewport }) => {
  //   // Ensure viewport dimensions are as expected

  //   console.log('Pointer X', pointer.x)
  //   console.log('Pointer Y', pointer.y)
  //   // pointer va de 1 a -1

  //   // Calculate the pointer's position in the scene's space
  //   const x = (pointer.x * viewport.width) / 2
  //   const y = (pointer.y * viewport.height) / 2
  //   // este calculo va de 16 a 12 en 600 x 695

  //   // Debugging: Log calculated positions to ensure they're correct
  //   console.log('Pointer position:', x, y)

  //   // Update the pointer's position
  //   ref.current?.setNextKinematicTranslation({ x, y, z: 0 })
  // })

  const { viewport } = useThree()
  useEffect(() => {
    const handleMouseMove = (event) => {
      // console.log('event.clientX', event.clientX)
      // console.log('event.clientY', event.clientY)
      // event.clientX va de 0 a 600
      // Assuming the canvas covers the entire viewport:
      const pointerX = (event.clientX / window.innerWidth) * 2 - 1
      const pointerY = -(event.clientY / window.innerHeight) * 2 + 1
      // pointerX va de -1 a 1

      const x = (pointerX * viewport.width) / 2
      const y = (pointerY * viewport.height) / 2
      // console.log('Pointer position:', x, y)
      // va de -430 a 430

      // Update the pointer's position in the scene
      // Convert x, y to your scene's specific coordinate system if needed

      ref.current?.setNextKinematicTranslation({ x, y, z: 0 })
    }

    // Listen for mouse move events on the entire document
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      {down && <BallCollider args={[size]} />}
      <mesh visible={down}>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </RigidBody>
  )
}

export default Description
