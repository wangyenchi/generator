import * as THREE from 'three';
import * as dat from 'dat.gui';
import { gsap } from 'gsap';
import mainFrag from './main.frag';
import mainVert from './main.vert';

// Setup
let t = 0;
let z = 1;
let ts = 0;

// controls
const controls = {
    speed: 6000,
    width: 1440,
    height: 1024,
    color: "#FFFFFF",
    isPlaying: true,
    isDay: false,
    dayNightTransition: { value: 1.0 }
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const material = new THREE.ShaderMaterial({

    uniforms: {
        time: { value: 0 },
        zoom: { value: 1 },
        seed: { value: Math.random() },
        isDay: { value: controls.isDay },
        targetColor: { value: Array.from(hexToVec3(parseInt(controls.color.slice(1), 16))) },
        dayNightTransition: { value: 0.0 }
    },

    vertexShader: mainVert,
    fragmentShader: mainFrag,
    
})

const mesh = new THREE.Mesh( new THREE.PlaneGeometry(), material );
// const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: controls.width,
    height: controls.height
}

// Camera
const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5);
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 10
scene.add(camera)

// Animation
function step(time) {
    material.uniforms.time.value = time / controls.speed;
    material.uniforms.zoom.value = z;
    material.uniforms.seed.value = ts;
    renderer.render(scene, camera);
    if(controls.isPlaying) {
        requestAnimationFrame( (t) => step(t) );
    }
    
}
requestAnimationFrame( (t) => step(t) );

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

// control interface
initInterface();
function initInterface() {
    const gui = new dat.GUI();
    gui.add(controls, 'isDay').name('Day / Night').onChange(updateDayNight);
    gui.addColor(controls, 'color').name('Color').onChange(updateColor);
    gui.add(controls, 'isPlaying').name('Play/Pause').onChange(updateAnimation);
    gui.add(controls, 'width').name('Width').onChange(updateSize);
    gui.add(controls, 'height').name('Height').onChange(updateSize);
    gui.add(controls, 'speed', 1000, 10000).name('Speed');
}

function updateAnimation(){
    if(controls.isPlaying) {
        requestAnimationFrame( (t) => step(t) );
    }
    else {
        renderer.render(scene, camera);
    }
}

function updateColor(hex) {
    controls.color = hex;
    material.uniforms.targetColor.value = hexToVec3(parseInt(hex.slice(1), 16));
    
}

function updateDayNight() {
    // Create a GSAP animation
    gsap.to(material.uniforms.dayNightTransition, {
        value: controls.isDay ? 1.0 : 0.0, // target value
        duration: 1, // duration in seconds
        ease: "power1.inOut" // easing function for a smooth transition
    });
}


function updateSize() {
    // Update sizes
    sizes.width = controls.width;
    sizes.height = controls.height;

    // Update renderer size
    renderer.setSize(sizes.width, sizes.height);

    // Update camera aspect ratio
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
}

// Convert a hex color to a vec3
function hexToVec3(hex) {
    let r = ((hex >> 16) & 255) / 255;
    let g = ((hex >> 8) & 255) / 255;
    let b = (hex & 255) / 255;
    return new THREE.Vector3(r, g, b);
}