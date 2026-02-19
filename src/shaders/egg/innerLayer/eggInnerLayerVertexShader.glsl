#include "../../utils/cnoise.glsl";

varying vec2 vUv;

void main() {
  vec3 newPosition = position;
  newPosition.xyz -= abs(sin(cnoise(vec3(newPosition.xy, 0.0) * 4.0)) * 0.08);

  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectionPosition;

  vUv = uv;
}
