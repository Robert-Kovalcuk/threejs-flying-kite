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
import {OBJLoader} from "three/addons";

const SCENE = new THREE.Scene();
const CAMERA = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
const RENDERER = new THREE.WebGLRenderer({alpha: true});
const AXIS_HELPER = new THREE.AxesHelper(6)
//const GRID_HELPER = new THREE.GridHelper(60, 100)
const GUI = new DAT.GUI();
GUI.add(CAMERA.position, 'x', -10, 10);
GUI.add(CAMERA.position, 'y', -10, 10);
GUI.add(CAMERA.position, 'z', -10, 10);

const color = 0xFFFFFF;
const near = 1;
const far = 22;
SCENE.fog = new THREE.Fog(color, near, far);



const WORLD = new CANNON.World()

function loadObj() {
	var loader = new OBJLoader();
	var textureSurface = new THREE.TextureLoader().load('assets/kitie/kittie3.png');

	loader.load(
		// resource URL
		'assets/kitie/kitie.obj',

		function ( object ) {
			// Traverse through all the meshes in the loaded object
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					// Set the material with the loaded texture
					child.material = new THREE.MeshBasicMaterial({
						map: textureSurface
					});
				}
			});
			SCENE.add(object);
		},

		// called when loading is in progress
		function ( xhr ) {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},

		// called when loading has errors
		function ( error ) {
			console.log('An error happened');
		}
	);
}


loadObj();


const controls = new OrbitControls(CAMERA, RENDERER.domElement);
const sphere = createMesh(SKY_GEOMETRY, SKY_MATERIAL, new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), true);
const floor = createMesh(FLOOR_GEOMETRY, FLOOR_MATERIAL, new THREE.Vector3(0, 0, 0), new THREE.Euler(Math.PI / 2, 0, 0));
const skyBox1 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(0, (3.5 / 2) - 0.1, -FLOOR_GEOMETRY.parameters.height / 2), new THREE.Euler(0, Math.PI, 0), true);
const skyBox2 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(0, (3.5 / 2) - 0.1, FLOOR_GEOMETRY.parameters.height / 2), new THREE.Euler(0, 0, 0), true);
const skyBox3 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(-FLOOR_GEOMETRY.parameters.height / 2, (3.5 / 2) - 0.1, 0), new THREE.Euler(0, Math.PI / 2, 0), true);
const skyBox4 = createMesh(SKYBOX_GEOMETRY, SKYBOX_MATERIAL, new THREE.Vector3(FLOOR_GEOMETRY.parameters.height / 2, (3.5 / 2) - 0.1, 0), new THREE.Euler(0, -Math.PI / 2, 0), true);
const kite = createMesh(KITE_GEOMETRY, KITE_MATERIAL, new THREE.Vector3(0, 5, 0), new THREE.Euler(0, 0, 0), false)
const string = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 1, 32), new THREE.MeshBasicMaterial({color: 0x000000}))

sphere.material.fog = false;

skyBox1.renderOrder = 1;
skyBox2.renderOrder = 1;
skyBox3.renderOrder = 1;
skyBox4.renderOrder = 1;

const kiteBody = createCannonBody(kite, 0.1)
WORLD.addBody(kiteBody)

const floorBody = createCannonBody(floor, 0, new CANNON.Plane())
floorBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)
WORLD.addBody(floorBody)
CAMERA.position.z = 9;
CAMERA.position.y = 1;
CAMERA.position.x = 1;

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
	//GRID_HELPER,
	string
);

RENDERER.setSize(window.innerWidth, window.innerHeight);

const sun = new THREE.PointLight(0xffff00, 1);
sun.position.set(5, 3, 5);
SCENE.add(sun);

document.getElementById('canvas1').appendChild(RENDERER.domElement);

document.addEventListener("keypress", (e) => {
	if (e.key === "q") {
		// on Q i want to apply a bit stronger force so it pulls the kite down
		console.log("q")
		kiteBody.applyLocalImpulse(new CANNON.Vec3(-kiteBody.velocity.x * 0.108, -kiteBody.velocity.y * 0.108, -kiteBody.velocity.z * 0.108), new CANNON.Vec3(0, 0, 0))
	}
	if (e.key === "a") {
		kiteBody.applyLocalImpulse(new CANNON.Vec3(-kiteBody.velocity.x * 0.308, 0, 0), new CANNON.Vec3(0, 0, 0))
	}
	if (e.key === "d") {
		kiteBody.applyLocalImpulse(new CANNON.Vec3(kiteBody.velocity.x * 0.308, 0, 0), new CANNON.Vec3(0, 0, 0))
	}
	if (e.key === "e") {
		kiteBody.applyLocalImpulse(new CANNON.Vec3(0, 0, -kiteBody.velocity.z * 0.308), new CANNON.Vec3(0, 0, 0))
	}
	if (e.key === "s") {
		kiteBody.applyLocalImpulse(new CANNON.Vec3(0,  kiteBody.velocity.z * 0.308, 0), new CANNON.Vec3(0, 0, 0))
	}
})

// do the same logic for GUI
GUI.add(kiteBody.velocity, 'x', -10, 10);
GUI.add(kiteBody.velocity, 'y', -10, 10);
GUI.add(kiteBody.velocity, 'z', -10, 10);
GUI.add(kiteBody, 'linearDamping', 0, 1);

kiteBody.position.set(0, 6, 1);
kiteBody.velocity.set(0, 0, 0);
kiteBody.angularVelocity.set(0, 0, 0);
kiteBody.linearDamping = 0.3; // Some air resistance

let directionChanger = 0;
(function animate() {
	requestAnimationFrame(animate);

	kite.position.copy(kiteBody.position)
	kite.quaternion.copy(kiteBody.quaternion)

	floor.position.copy(floorBody.position);
	floor.quaternion.copy(floorBody.quaternion);

	if(directionChanger > 180) {
		const windDirection = new CANNON.Vec3(-Math.random() * 10, Math.random() + 0.5, -Math.random() * 0.1);
		kiteBody.applyLocalForce(windDirection, new CANNON.Vec3(0, 0, 0))
		directionChanger = 0
	} else {
		const windDirection = new CANNON.Vec3(Math.random() * 0.1, Math.random() + 0.5, -Math.random() * 0.1);
		kiteBody.applyLocalForce(windDirection, new CANNON.Vec3(0, 0, 0))
	}
	directionChanger++

	sphere.rotation.z += 0.0002;
	CAMERA.lookAt(kite.position.x, kite.position.y, kite.position.z)

	// set the string length to the distance between the kite and the floor

	string.position.copy(kite.position.clone().add(new THREE.Vector3(0, -string.scale.y / 2, 0))); // Adjust the offset as needed

	// const direction = new THREE.Vector3();
	// ;
	// direction.sub(string.position);
	// string.scale.y = kite.position.distanceTo(floor.position);
	// string.rotation.setFromRotationMatrix(new THREE.Matrix4().lookAt(direction, new THREE.Vector3(0, kiteBody.position.y, 0), new THREE.Vector3(0, 0, 1)));

	WORLD.step(1/60)
	RENDERER.render(SCENE, CAMERA);
	controls.update();
})();