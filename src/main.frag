varying vec3 vPos;
varying vec2 vUv;
uniform float time;
uniform float zoom;
uniform bool isDay;
uniform float seed;
uniform vec3 targetColor;

#define PI 3.14159265359
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)

void main() {

    float n = snoise3( vec3( vUv * zoom, time + seed * 100.0) );

    float mdf = 0.1;
    float grain = (fract(sin(dot(vUv, vec2(12.9898,78.233)*2.0))*43758.5453));
    // gl_FragColor = vec4(1.0);

    vec3 color;
    vec3 originalColor = vec3( mix( n, grain, 0.2));

    
    if(isDay) {
        // day
        // vec3 targetColor = vec3(204.0/255.0, 253.0/255.0, 104.0/255.0); // RGB equivalent of #CCFD68 - green
        vec3 white = vec3(1.0);
        color = mix(white, targetColor, originalColor);
    } else {
        // night
        color = originalColor;

    }

    gl_FragColor = vec4(color, 1.0);

    
    // vec3 targetColor = vec3(0.0/255.0, 120.0/255.0, 255.0/255.0); // RGB equivalent of #0066FF - blue
    // vec3 targetColor = vec3(199.0/255.0, 42.0/255.0, 42.0/255.0); // RGB equivalent of #C72A2A - red

}