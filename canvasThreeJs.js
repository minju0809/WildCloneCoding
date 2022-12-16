import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector(".canvasThreeJs");
const meshes = [];

const renderer = new THREE.WebGLRenderer({ canvas });

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const light_1 = new THREE.PointLight();
scene.add(light_1);
light_1.position.set(0, 0, 30);
const light_2 = new THREE.PointLight();
scene.add(light_2);
light_2.position.set(0, 0, -30);

const controls = new OrbitControls(camera, canvas);
renderer.setSize(window.innerWidth, window.innerHeight);

for (let i = 0; i < 500; i++) {
  const cube = createCube();
  meshes.push(cube);
  scene.add(cube);

  cube.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, 0);
}

camera.position.z = 30;

function animate(time) {
  requestAnimationFrame(animate);

  meshes.forEach((mesh, index) => {
    const radius = 1 + (15 * index) / meshes.length;
    const speed = index / meshes.length / 1000;
    mesh.position.set(
      radius * Math.sin(index + time * speed), 
      radius * Math.cos(index + time * speed), 
      radius * Math.sin(index + 2 * time * speed)
    );
    mesh.lookAt(0, 0, 0);
  });

  renderer.render(scene, camera);
}

function createCube() {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color:
      "#" +
      Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0"),
  });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}

animate();
