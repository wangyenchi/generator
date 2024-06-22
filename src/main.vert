uniform sampler2D positionData;
varying vec3 vPos;
varying vec2 vUv;

void main() {
    vUv = uv;
    vec3 pos = position;
    vPos = pos;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( vec3( pos.xyz), 1.0);
}