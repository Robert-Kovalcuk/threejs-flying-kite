import * as CANNON from "cannon"
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
import KITE_GEOMETRY from "./objects/kite/kiteGeometry";
import KITE_MATERIAL from "./objects/kite/kiteMaterial";
import createCannonBody from "./utils/createCannonBody";
import createRestrictingBody from "./utils/createRestrictingBody";
import scene from "three/addons/offscreen/scene";

const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({alpha: true});
const AXIS_HELPER = new THREE.AxesHelper(6)
const GRID_HELPER = new THREE.GridHelper(60, 100)
const GUI = new DAT.GUI()
const WORLD = new CANNON.World()

const controls = new OrbitControls(CAMERA, RENDERER.domElement);
const sphere = createMesh(SKY_GEOMETRY, SKY_MATERIAL, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), true);
const floor = createMesh(FLOOR_GEOMETRY, FLOOR_MATERIAL, new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 2, 0, 0));
const skyBox1 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(0, (3.5 / 2) - 0.1, -FLOOR_GEOMETRY.parameters.height / 2), new THREE.Euler(0, Math.PI, 0), true);
const skyBox2 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(0, (3.5 / 2) - 0.1, FLOOR_GEOMETRY.parameters.height / 2), new THREE.Euler(0, 0, 0), true);
const skyBox3 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(-FLOOR_GEOMETRY.parameters.height / 2, (3.5 / 2) - 0.1, 0), new THREE.Euler(0, Math.PI / 2, 0), true);
const skyBox4 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(FLOOR_GEOMETRY.parameters.height / 2, (3.5 / 2) - 0.1, 0), new THREE.Euler(0, -Math.PI / 2, 0), true);
const kite = createMesh(KITE_GEOMETRY, KITE_MATERIAL, new THREE.Vector3(0, 2, 0), new THREE.Euler(0, 0, 0), false)


const kiteBody = createCannonBody(kite, 0.1)
WORLD.addBody(kiteBody)

const floorBody = createCannonBody(floor, 0, new CANNON.Plane())
floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
WORLD.addBody(floorBody)


WORLD.gravity.set(0, -9.81, 0);

SCENE.add(
	floor,
	skyBox1,
	skyBox2,
	skyBox3,
	skyBox4,
	sphere,
	kite,
	AXIS_HELPER,
	GRID_HELPER
);

RENDERER.setSize(window.innerWidth, window.innerHeight);
CAMERA.position.z = 15;
CAMERA.position.y = 10;
document.getElementById('canvas1').appendChild(RENDERER.domElement);
const stringConstraint = new CANNON.PointToPointConstraint(
	kiteBody,
	new CANNON.Vec3(floorBody.position.x - 5, floorBody.position.y - 5, floorBody.position.z),
	floorBody, floorBody.position, 0.02);
WORLD.addConstraint(stringConstraint);

(function animate() {
	requestAnimationFrame(animate);

	WORLD.step(1/60)

	kite.position.copy(kiteBody.position)
	kite.quaternion.copy(kiteBody.quaternion)

	floor.position.copy(floorBody.position);
	floor.quaternion.copy(floorBody.quaternion);

	// Apply air control forces
	const airControlForce = 0.1; // Adjust the force as needed

	stringConstraint.update();
	kiteBody.applyLocalForce(new CANNON.Vec3(0, 0, -1.4), kiteBody.position);

	RENDERER.render(SCENE, CAMERA);
	controls.update();
})();