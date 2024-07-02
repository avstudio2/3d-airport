import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DObject, CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
const size = 100;
const divisions = 100;

const scene = new THREE.Scene();

const gridHelper = new THREE.GridHelper(size, divisions);
const axesHelper = new THREE.AxesHelper(25);
// scene.add(gridHelper);
// scene.add(axesHelper);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const color = 0xFFFFFF;
const intensity = 1;
const light = new THREE.AmbientLight(color, intensity);
scene.add(light);

const loader = new GLTFLoader();

loader.load('./objects/airplanes/low_poly_airplane.glb', function (gltf) {
    let mesh = gltf.scene;
    mesh.scale.set(5 * gltf.scene.scale.x, 5 * gltf.scene.scale.y, 5 * gltf.scene.scale.z)
    mesh.position.set(1.6, .5, -7.8);
    mesh.rotation.y = 89;
    const el = document.createElement('div');
    el.className = 'label'
    el.textContent = 'AC 876 PARKED \r\n TOBT 14:15';
    el.style.marginTop = '-1em';
    const objectCSS = new CSS2DObject(el);
    objectCSS.position.set(0,1,0);
    mesh.add(objectCSS);
    scene.add(mesh);
}, undefined, function (error) {
    console.error(error, 'can not load airplane');
})

loader.load('./objects/buildings/small_shop_building.glb', function (gltf) {
    scene.add(gltf.scene)
}, undefined, function (error) {
    console.error(error, 'can not load building')
})

loader.load('./objects/assets/jetway.glb', function (gltf) {
    let mesh = gltf.scene;
    mesh.scale.set(.15 * gltf.scene.scale.x, .15 * gltf.scene.scale.y, .15 * gltf.scene.scale.z)
    mesh.position.set(3, 0, -3);
    mesh.rotation.y = 180;
    scene.add(mesh);
}, undefined, function (error) {
    console.error(error, 'can not load jetway');
})

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight);
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';
document.body.appendChild(labelRenderer.domElement);

const controls = new OrbitControls(camera, labelRenderer.domElement);

camera.position.set(10,5,20);
controls.update();

function animate() {
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
    controls.update();
}

renderer.setAnimationLoop(animate);