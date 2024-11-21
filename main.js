import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Scene and Camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Environment Map
const rgbeLoader = new RGBELoader();
rgbeLoader.setPath('/~khaic/S2024/threejs-blender/textures/'); // Adjusted path
rgbeLoader.load('envir.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture; // Set HDR as the scene background
  scene.environment = texture; // Use HDR for lighting
});

// Basic Primitives
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.position.x = -2;

// GLTF Models Loader
const loader = new GLTFLoader();

// Load Sketchfab Model
loader.load('/~khaic/S2024/threejs-blender/models/cat.glb', (gltf) => { // Adjusted path
  const externalModel = gltf.scene;
  externalModel.scale.set(0.01, 0.01, 0.01);
  externalModel.position.set(2, 0, 0);
  scene.add(externalModel);
});

loader.load('/~khaic/S2024/threejs-blender/models/cat2.glb', (gltf) => { // Adjusted path
  const externalModel = gltf.scene;
  externalModel.scale.set(5, 5, 5);
  externalModel.position.set(0, 0, 0);
  scene.add(externalModel);
});

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});