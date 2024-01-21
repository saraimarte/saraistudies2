import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjust intensity as needed
scene.add(ambientLight);

//Add cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({'color': 0xff0000})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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

camera.position.z = 3;

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

function onClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObject(webpagePlane);

    if (intersects.length > 0) {
        window.location.href = '../home';
    }
}

