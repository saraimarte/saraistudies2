import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// Canvas
const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjust intensity as needed
scene.add(ambientLight);

/*
//Add cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({'color': 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)
*/

//!SECTION
/**
 * Model
 */

gltfLoader.load(
    '../../public/computer.glb',
    (gltf) =>
    {
        console.log(gltf.scene)
    }
)

/**
 * Materials
 */
// Baked material
const bakedMaterial = new THREE.MeshBasicMaterial({ color: 0xfffff })
const monitorMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })
gltfLoader.load(
    '../../public/computer.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)


        const monitor = gltf.scene.children.find((child) => child.name === 'monitor')
        // Apply materials
        monitor.material = monitorMaterial
    }
)
// Webpage Plane
const webpageWidth = 20; // Increase the width
const webpageHeight = 10; // Increase the height
const webpageGeometry = new THREE.PlaneGeometry(webpageWidth, webpageHeight);
const webpageTexture = new THREE.TextureLoader().load('/website.png'); // Updated image path
const webpageMaterial = new THREE.MeshBasicMaterial({ map: webpageTexture, side: THREE.DoubleSide });
const webpagePlane = new THREE.Mesh(webpageGeometry, webpageMaterial);
scene.add(webpagePlane);

// Set the position of the webpage plane
webpagePlane.position.set(0, 0, -5);
console.log('Texture loaded successfully:', webpageTexture);

// Sizes
const sizes = {
    width: 1000,
    height: 600
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

camera.position.z = 3;n 

// Renderer
const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera)

// Adjust camera aspect ratio after resizing
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);
});

// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Click event listener
window.addEventListener('click', onClick);

// Touch event listener
window.addEventListener('touchstart', onTouchStart);

function onClick(event) {
    handleRaycast(event.clientX, event.clientY);
}

function onTouchStart(event) {
    if (event.touches.length > 0) {
        const touch = event.touches[0];
        handleRaycast(touch.clientX, touch.clientY);
    }
}

function handleRaycast(clientX, clientY) {
    mouse.x = (clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(webpagePlane);

    if (intersects.length > 0) {
        window.location.href = '../home';
    }
}