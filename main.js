import * as THREE from "three"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import SKYBOX_GEOMETRY from "./objects/skybox/skyBoxGeometry";
import SKYBOX_MATERIAL from "./objects/skybox/skyBoxMaterial";
import FLOOR_MATERIAL from "./objects/floor/floorMaterial";
import FLOOR_GEOMETRY from "./objects/floor/floorGeometry";
import SKY_GEOMETRY from "./objects/sky/skyGeometry";
import SKY_MATERIAL from "./objects/sky/skyMaterial";
import createMesh from "./utils/createMesh";
import * as DAT from "dat.gui"

const SCENE = new THREE.Scene();

const color = 0xFFFFFF;
const near = 1;
const far = 22;
SCENE.fog = new THREE.Fog(color, near, far);

const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({alpha: true});
const AXIS_HELPER = new THREE.AxesHelper(6)
const GRID_HELPER = new THREE.GridHelper(60, 100)
const GUI = new DAT.GUI()

const controls = new OrbitControls(CAMERA, RENDERER.domElement);
const sphere = createMesh(SKY_GEOMETRY, SKY_MATERIAL, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), true);
const floor = createMesh(FLOOR_GEOMETRY, FLOOR_MATERIAL, new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 2, 0, 0));
const skyBox1 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(0, (3.5 / 2) - 0.1, -FLOOR_GEOMETRY.parameters.height / 2), new THREE.Euler(0, Math.PI, 0), true);
const skyBox2 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(0, (3.5 / 2) - 0.1, FLOOR_GEOMETRY.parameters.height / 2), new THREE.Euler(0, 0, 0), true);
const skyBox3 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(-FLOOR_GEOMETRY.parameters.height / 2, (3.5 / 2) - 0.1, 0), new THREE.Euler(0, Math.PI / 2, 0), true);
const skyBox4 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(FLOOR_GEOMETRY.parameters.height / 2, (3.5 / 2) - 0.1, 0), new THREE.Euler(0, -Math.PI / 2, 0), true);

sphere.material.fog = false;

skyBox1.renderOrder = 1;
skyBox2.renderOrder = 1;
skyBox3.renderOrder = 1;
skyBox4.renderOrder = 1;


SCENE.add(floor, skyBox1, skyBox2, skyBox3, skyBox4, sphere, AXIS_HELPER, GRID_HELPER);


RENDERER.setSize(window.innerWidth, window.innerHeight);
CAMERA.position.z = 5;
CAMERA.position.y = 2;
CAMERA.position.x = 2;

const sun = new THREE.PointLight(0xffff00, 1);
sun.position.set(5, 3, 5);
SCENE.add(sun);

// GUI

const windSpeedParams = {
	windSpeed: 3
};

let updateWindSpeed = () => {
	
}

const fogFolder = GUI.addFolder('Settings');
fogFolder.add(windSpeedParams, 'windSpeed', 0, 10).onChange(updateWindSpeed);




document.getElementById('canvas1').appendChild(RENDERER.domElement);

(function animate() {
	requestAnimationFrame(animate);
	RENDERER.render(SCENE, CAMERA);

	// test hranice pre zem

	if ( CAMERA.position.y < floor.position.y + 0.5 ) {
		CAMERA.position.y = floor.position.y + 0.5;
	}

	controls.update();
})();
