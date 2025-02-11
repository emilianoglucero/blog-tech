/* eslint-disable react/no-unknown-property */
import { Sparkles } from '@react-three/drei'

export const Sphere = ({
  size = 0.1,
  amount = 50,
  color = '#42ff00',
  emissive = '#42ff00',
  ...props
}) => (
  <mesh {...props}>
    <sphereGeometry args={[size, 64, 64]} />
    <meshPhysicalMaterial
      roughness={0}
      color={color}
      emissive={emissive || color}
      envMapIntensity={0.2}
    />
    <Sparkles count={amount} scale={size * 20} size={10} speed={0.4} />
  </mesh>
)
