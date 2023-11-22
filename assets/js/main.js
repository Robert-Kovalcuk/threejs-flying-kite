// main.js

// Inicializace scény, kamery a rendereru
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas1').appendChild(renderer.domElement);

// Nastavení kamery
camera.position.z = 5;


var geometrySphere = new THREE.SphereGeometry( 100, 100, 100 );
var sphereTexture = new THREE.ImageUtils.loadTexture( '/assets/img/sky.jpg' );
var materialSphere = new THREE.MeshBasicMaterial( {map: sphereTexture, transparent: true, side: THREE.DoubleSide} );
sphere = new THREE.Mesh( geometrySphere, materialSphere );
sphere.position.set(0, 0, 0);
scene.add( sphere );


var controls = new THREE.OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.25;
// controls.screenSpacePanning = false;
// controls.maxPolarAngle = Math.PI / 2;

// Animace
var render = function () {

    requestAnimationFrame(render);

    renderer.render(scene, camera);

    controls.update();

};

// Volání animace
render();
