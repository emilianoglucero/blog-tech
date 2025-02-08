export const fragment = `
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;

  void main() {
    vec2 gridUV = floor(vUv * vec2(80.0, 80.0)) / vec2(80.0, 80.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/80.0, 1.0/80.0);

    vec2 mouseDirection = uMouse - uPrevMouse;

    vec2 pixelToMouseDirection = centerOfPixel - uMouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.09, 0.2, pixelDistanceToMouse);

    vec2 uvOffset = strength * -mouseDirection * 10.4;
    vec2 uv = vUv - uvOffset;

    vec4 color = texture2D(uTexture, uv);
    gl_FragColor = color;
  }
`
