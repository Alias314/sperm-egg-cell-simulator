uniform float uTime;

varying vec2 vUv;

void main() {
  float frequency = 10.0;
  float scale = 0.15;
  float speed = 15.0;

  vec3 newPosition = position;
  newPosition.x += sin(position.y * frequency + uTime * speed) * scale * uv.y;
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;

  vUv = uv;
}