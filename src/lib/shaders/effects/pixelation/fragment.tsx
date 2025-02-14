export const fragment = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uBrightness;
  uniform float uContrast;
  uniform float uOffsetFactor;

  void main() {
    vec2 gridUV = floor(vUv * vec2(80.0, 80.0)) / vec2(80.0, 80.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/80.0, 1.0/80.0);

    vec2 mouseDirection = uMouse - uPrevMouse;

    vec2 pixelToMouseDirection = centerOfPixel - uMouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.09, 0.2, pixelDistanceToMouse);

    vec2 uvOffset = strength * -mouseDirection * uOffsetFactor;
    vec2 uv = vUv - uvOffset;

    vec4 color = texture2D(uTexture, uv);
    
    color.rgb = (color.rgb - 0.5) * uContrast + 0.5;
    color.rgb *= uBrightness;
    
    color.rgb = pow(color.rgb, vec3(1.0/2.2)); // Gamma correction
    
    gl_FragColor = color;
  }
`
