import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let object;
let controls;
const objToRender = 'house';

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container3D").appendChild(renderer.domElement);

camera.position.z = 20;
camera.position.x = 20;
camera.position.y = 20; // Adjust as needed for the house model

const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

controls = new OrbitControls(camera, renderer.domElement);

// Raycaster for mouse picking
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Function to handle mouse clicks
function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);

  if (intersects.length > 0) {
    toggleMenu();
  }
}

// Function to toggle the menu
function toggleMenu() {
  const menu = document.getElementById('sideMenu');
  if (menu.style.right === '-400px' || menu.style.right === '') {
    menu.style.right = '0px';
  } else {
    menu.style.right = '-400px';
  }
}

// Create the side menu
function createSideMenu() {
  const menu = document.createElement('div');
  menu.id = 'sideMenu';
  menu.innerHTML = `
    <h2>Welcome to Cozy Coffee House</h2>
    <img src="images.jpg" alt="Cozy Coffee House" style="width: 100%; height: 250px; margin-bottom: 15px;">
    <p>Nestled in the heart of the city, Cozy Coffee House is your perfect escape for premium coffee and delightful pastries. Our warm atmosphere and friendly staff ensure a memorable experience with every visit.</p>
    <p>Open daily: 7 AM - 8 PM</p>
    <div class="button-container">
      <button class="contact-btn" onclick="window.open('https://www.facebook.com/profile.php?id=100043204226212','_blank')">Call Us</button>
      <button class="contact-btn" onclick="window.location.href='mailto:info@cozycoffeehouse.com'">Email Us</button>
      <button class="contact-btn" onclick="window.open('https://maps.google.com?q=Cozy+Coffee+House','_blank')">Find Us</button>
    </div>
    <button id="closeMenu">Close</button>
  `;
  document.body.appendChild(menu);

  // Add event listener to close button
  document.getElementById('closeMenu').addEventListener('click', toggleMenu);

  // Add CSS styles
  const style = document.createElement('style');
  style.textContent = `
    #sideMenu {
      position: fixed;
      top: 0;
      right: -350px;
      width: 300px;
      height: 100%;
      background-color: #f8f1e9;
      padding: 20px;
      box-shadow: -2px 0 5px rgba(0,0,0,0.5);
      transition: right 0.3s ease;
      overflow-y: auto;
      font-family: Arial, sans-serif;
      color: #5d4037;
    }
    #sideMenu h2 {
      color: #43a047;
      margin-bottom: 15px;
    }
    #sideMenu p {
      line-height: 1.6;
      margin-bottom: 15px;
    }
    .button-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 20px;
    }
    .contact-btn {
      flex-basis: calc(33% - 5px);
      padding: 10px;
      margin-bottom: 10px;
      background-color: #43a047;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .contact-btn:hover {
      background-color: #2e7d32;
    }
    #closeMenu {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #5d4037;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    #closeMenu:hover {
      background-color: #4e342e;
    }
  `;
  document.head.appendChild(style);
}

// Call createSideMenu on load
createSideMenu();

// Add click event listener
window.addEventListener('click', onMouseClick, false);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();