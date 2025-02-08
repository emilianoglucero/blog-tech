export const vertex = `
varying vec2 vUv;

void main() { // void means doens't return something
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
}
`
