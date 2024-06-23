varying vec3 vPos;
varying vec2 vUv;
uniform float time;
uniform float zoom;
uniform bool isDay;
uniform float seed;
uniform vec3 targetColor;
uniform float dayNightTransition;

#define PI 3.14159265359
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {

    float n = snoise3( vec3( vUv * zoom, time + seed * 100.0) );

    float mdf = 0.1;
    float grain = (fract(sin(dot(vUv, vec2(12.9898,78.233) * 2.0)) * 43758.5453));

    vec3 color;
    vec3 originalColor = vec3( mix( n, grain, 0.1));

    vec3 dayColor = mix(vec3(1.0), targetColor, originalColor);
    vec3 nightColor = mix(vec3(0.0), targetColor, originalColor);

    
    color = mix(nightColor, dayColor, dayNightTransition);

    gl_FragColor = vec4(color, 1.0);


}