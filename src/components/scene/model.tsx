// // components/Model.tsx
// import { useFrame, useLoader } from '@react-three/fiber'
// import { useControls } from 'leva'
// import { useEffect, useRef, useState } from 'react'
// import * as THREE from 'three'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// const vertexShader = `
//   varying vec2 vUv;
//   void main() {
//     vUv = uv;
//     gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//   }
// `

// const fragmentShader = `
//   uniform float time;
//   uniform sampler2D uTexture;
//   varying vec2 vUv;
//   void main() {
//     vec4 texColor = texture2D(uTexture, vUv);
//     float dissolve = clamp(sin(time * 3.0 + vUv.x * 10.0) * 0.5 + 0.5, 0.0, 1.0);
//     if (dissolve < 0.1) discard;
//     gl_FragColor = vec4(texColor.rgb, dissolve);
//   }
// `

// const Model = ({ modelPath }) => {
//   const gltf = useLoader(GLTFLoader, modelPath)
//   const [hovered, setHovered] = useState(false)
//   const clock = useRef(new THREE.Clock())
//   const shaderMaterial = useRef(
//     new THREE.ShaderMaterial({
//       uniforms: {
//         time: { value: 0 },
//         uTexture: { value: null }
//       },
//       vertexShader,
//       fragmentShader,
//       transparent: true
//     })
//   )

//   useFrame(() => {
//     shaderMaterial.current.uniforms.time.value = clock.current.getElapsedTime()
//   })

//   useEffect(() => {
//     if (gltf && gltf.scene) {
//       gltf.scene.traverse((child) => {
//         if (child.isMesh) {
//           child.userData.originalMaterial = child.material
//         }
//       })
//     }
//   }, [gltf])

//   const handlePointerOver = () => setHovered(true)
//   const handlePointerOut = () => setHovered(false)

//   // Controls for position, rotation, and scale
//   const { position, rotation, scale } = useControls('Model Controls', {
//     position: { value: [0, -3.4, -4], step: 0.1 },
//     rotation: { value: [12, 182, 0], step: 0.1 },
//     scale: { value: [0.8, 0.8, 0.8], step: 0.1 }
//   })

//   return (
//     <primitive
//       object={gltf.scene}
//       position={position}
//       rotation={rotation.map((rot) => (rot / 180) * Math.PI)} // Convert degrees to radians
//       scale={scale} // Apply the scale control value
//       onPointerOver={handlePointerOver}
//       onPointerOut={handlePointerOut}
//       onUpdate={(self) => {
//         self.traverse((child) => {
//           if (child.isMesh && child.material) {
//             if (hovered) {
//               shaderMaterial.current.uniforms.uTexture.value =
//                 child.material.map || null
//               child.material = shaderMaterial.current
//             } else if (child.userData.originalMaterial) {
//               child.material = child.userData.originalMaterial
//             }
//           }
//         })
//       }}
//     />
//   )
// }

// export default Model
