varying vec3 vPos;
varying vec2 vUv;
uniform float time;
uniform float zoom;

uniform float seed;

// #define PI 3.14159265359
// #define glslify snoise3 = require(glsl-noise/simplex/3d)

void main() {

    // float n = snoise3(vec3( vUv * zoom, time + seed * 100.0));

    // float mdf = 0.1;
    // float grain = (fract(sin(dot(vUv, vec2(12.9898,78.233)*2.0))*43758.5453));
    gl_FragColor = vec4(1.0);
    // gl_FragColor = vec4( vec3( mix( n, grain, 0.1)), 1.0 );

}