// // components/Scene.tsx
// import { OrbitControls } from '@react-three/drei'
// import { Canvas, useThree } from '@react-three/fiber'
// import { useControls } from 'leva'
// import { useEffect } from 'react'

// import Model from './Model'

// const CameraControls = () => {
//   const { camera } = useThree()
//   const { fov, near, far } = useControls('Camera Controls', {
//     fov: { value: 77, min: 1, max: 180 },
//     near: { value: 0.1, min: 0.01, max: 100 },
//     far: { value: 100, min: 100, max: 10000 }
//   })

//   useEffect(() => {
//     camera.fov = fov
//     camera.near = near
//     camera.far = far
//     camera.updateProjectionMatrix()
//   }, [camera, fov, near, far])

//   return null
// }

// const Scene = () => {
//   const modelPath = './assets/models/coffe_cafe/scene.gltf'

//   return (
//     <Canvas>
//       <ambientLight />
//       <pointLight position={[10, 10, 10]} />
//       <Model modelPath={modelPath} />
//       <OrbitControls />
//       <CameraControls />
//     </Canvas>
//   )
// }

// export default Scene
