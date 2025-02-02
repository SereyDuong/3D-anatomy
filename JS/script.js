import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // White background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Enable clipping
renderer.localClippingEnabled = true;

// Lighting adjustments
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
directionalLight.position.set(12, 12, 12);
scene.add(directionalLight);

const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// OrbitControls for navigation
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 30;
controls.enableZoom = true;

// Create a clipping plane (normal along +X)
const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
// Option 1: Disable PlaneHelper completely by not adding it.
// Option 2: Or add it with white color so it blends with the background:
// scene.add(new THREE.PlaneHelper(clippingPlane, 10, 0xffffff));
// For now, we'll leave it out so it won't be visible.

// Create the slider element (its range will be set after loading the model)
const slider = document.createElement('input');
slider.type = 'range';
slider.step = 0.1;
slider.style.position = 'absolute';
slider.style.top = '20px';
slider.style.left = '20px';
slider.style.zIndex = '1000';
document.body.appendChild(slider);

// Load 3D model
const loader = new GLTFLoader();
let model;
loader.load('3d file/Brain.glb', (gltf) => {
    model = gltf.scene;
    model.scale.set(30, 30, 30);

    // Apply clipping to all meshes of the model
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.clippingPlanes = [clippingPlane];
            child.material.clipIntersection = false;
        }
    });

    scene.add(model);

    // Center the model
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    model.position.sub(center);

    // Recalculate bounding box after centering
    const newBox = new THREE.Box3().setFromObject(model);
    const size = newBox.getSize(new THREE.Vector3());
    // For a centered model, newBox.min.x is -width/2 and newBox.max.x is width/2.
    // We'll set the slider range so that:
    // - slider.min = 0 corresponds to no clipping (the clipping plane is at the far right, x = width/2)
    // - slider.max = size.x/2 corresponds to clipping at the center (x = 0).
    slider.min = 0;
    slider.max = size.x / 2;
    slider.value = 0; // default value: no clipping

    // Set the clipping plane constant using an inverted mapping:
    // When slider.value = 0, constant = slider.max (full model visible).
    clippingPlane.constant = slider.max - slider.value;

    animate();
}, undefined, (error) => {
    console.error("Error loading the model: ", error);
});

// Adjust camera position
camera.position.set(0, 3, 12);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Update clipping plane based on slider input
slider.addEventListener('input', (event) => {
    const value = parseFloat(event.target.value);
    // Invert the mapping so that:
    // slider.value = 0 -> constant = slider.max (no clipping)
    // slider.value = slider.max -> constant = 0 (clipping at center)
    clippingPlane.constant = slider.max - value;
});
