import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 400
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Webpage Plane
const webpageWidth = 0.86; // Increase the width
const webpageHeight = 0.64; // Increase the height
const webpageGeometry = new THREE.PlaneGeometry(webpageWidth, webpageHeight);
const webpageTexture = new THREE.TextureLoader().load('/website.png'); // Updated image path
const webpageMaterial = new THREE.MeshBasicMaterial({ map: webpageTexture, side: THREE.DoubleSide });
const webpagePlane = new THREE.Mesh(webpageGeometry, webpageMaterial);
scene.add(webpagePlane);

// Set the position of the webpage plane
webpagePlane.position.set(0.03, 0.28, 0.05);

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader()

// Draco loader
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/') // Ensure this path is correct

// GLTF loader
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

//Desk
const bakedTexture = textureLoader.load('/textures/desk8.png')
bakedTexture.flipY = false
bakedTexture.colorSpace = THREE.SRGBColorSpace
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture })

gltfLoader.load(
    '/desk.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
    }
)

gltfLoader.load(
    '/mouse.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
    }
)

gltfLoader.load(
    '/paper.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
    }
)

const bgMaterial = new THREE.MeshBasicMaterial({color: 0x1E2019})

gltfLoader.load(
    '/floor.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bgMaterial
        })
        scene.add(gltf.scene)
    }
)

//Glass
const bakedGlass = textureLoader.load('/textures/glassNew.png')
const glassMaterial = new THREE.MeshBasicMaterial({ map: bakedGlass })

//Screen
const bakedScreen = textureLoader.load('/textures/monitor.png')
bakedScreen.flipY = false
bakedScreen.colorSpace = THREE.SRGBColorSpace
const screenMaterial = new THREE.MeshBasicMaterial({ map: bakedGlass })

//Computer
const compTexture = textureLoader.load('/textures/comp.jpg')
compTexture.flipY = false
compTexture.colorSpace = THREE.SRGBColorSpace
const compTextureMaterial = new THREE.MeshBasicMaterial({ map: compTexture })

//Poweron
const bakedPowerOn = textureLoader.load('/textures/poweron.jpg')
bakedPowerOn.flipY = false
bakedPowerOn.colorSpace = THREE.SRGBColorSpace
const powerOnMaterial = new THREE.MeshBasicMaterial({ map: bakedPowerOn })

gltfLoader.load(
    '/computer.glb',
    (gltf) =>
    {
        gltf.scene.traverse((child) =>
        {
            child.material = bakedMaterial
        })
        scene.add(gltf.scene)
        
        // Get each object
        const screen = gltf.scene.children.find((child) => child.name === 'screen' )
        const powerbtn = gltf.scene.children.find((child) => child.name === 'powerbtn')
        const glass = gltf.scene.children.find((child) => child.name === 'glass' )
        
        // Apply materials
        glass.material = glassMaterial
        powerbtn.material = powerOnMaterial
        screen.material = screenMaterial
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(15, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 6
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

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