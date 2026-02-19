uniform float uTime;

void main() {
  float frequency = 10.0;
  float scale = 0.01;
  float speed = 15.0;

  vec3 newPosition = position;
  newPosition *= uv.y * 1.5;
  newPosition.x += sin(position.y * frequency + uTime * speed) * scale * uv.y;
  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;
}