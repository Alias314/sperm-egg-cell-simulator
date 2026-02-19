varying vec2 vUv;

void main() {
  vec3 strength = vec3(max(vUv.y + 0.5, 0.9));
  gl_FragColor = vec4(strength, 1.0);
}