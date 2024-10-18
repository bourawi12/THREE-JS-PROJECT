// app.js

import * as THREE from 'three';

let scene, camera, renderer, cube1, cube2;
let mouseX = 0, mouseY = 0;
let raycaster, mouse;

function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myThreeJsCanvas') });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create first cube (green)
    const geometry1 = new THREE.BoxGeometry();
    const material1 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube1 = new THREE.Mesh(geometry1, material1);
    cube1.position.x = -1;
    scene.add(cube1);

    // Create second cube (blue)
    const geometry2 = new THREE.BoxGeometry();
    const material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    cube2 = new THREE.Mesh(geometry2, material2);
    cube2.position.x = 1;
    scene.add(cube2);

    // Set up raycaster for click detection
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);

    // Start animation
    animate();
}

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects([cube1, cube2]);

    if (intersects.length > 0) {
        if (intersects[0].object === cube1) {
            document.getElementById('clickText').textContent = 'You clicked the green cube!';
        } else if (intersects[0].object === cube2) {
            document.getElementById('clickText').textContent = 'You clicked the blue cube!';
        }
        document.getElementById('clickText').style.display = 'block';
    }
}

function animate() {
    requestAnimationFrame(animate);

    // Update cube rotations based on mouse position
    cube1.rotation.x = mouseY * Math.PI;
    cube1.rotation.y = mouseX * Math.PI;
    cube2.rotation.x = mouseY * Math.PI;
    cube2.rotation.y = mouseX * Math.PI;

    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();