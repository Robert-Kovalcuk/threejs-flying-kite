var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas1').appendChild(renderer.domElement);

camera.position.z = 5;
camera.position.y = 1;


var geometrySphere = new THREE.SphereGeometry(100, 100, 100);
var sphereTexture = new THREE.TextureLoader().load('/assets/img/sky.jpg');
var materialSphere = new THREE.MeshBasicMaterial({ map: sphereTexture, transparent: true, side: THREE.DoubleSide });
var sphere = new THREE.Mesh(geometrySphere, materialSphere);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Textura pro podlahu
var floorTexture = new THREE.TextureLoader().load('assets/img/grass.jpeg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);

// Vytvoření podlahy
var floorGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide, transparent: true }); // Přidejte možnost transparent: true
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = Math.PI / 2;
scene.add(floor);

// Textura pro okraj podlahy
var borderTexture = new THREE.TextureLoader().load('assets/img/skybox.png');
borderTexture.wrapS = THREE.RepeatWrapping;
borderTexture.wrapT = THREE.RepeatWrapping;

// Vytvoření obvodu podlahy
var borderGeometry = new THREE.PlaneGeometry(20, 3.5, 1, 1);
var borderMaterial = new THREE.MeshBasicMaterial({ map: borderTexture, side: THREE.DoubleSide, transparent: true, premultipliedAlpha: true }); // Přidejte možnost transparent: true

// flip
var border1 = new THREE.Mesh(borderGeometry, borderMaterial);
border1.position.y = (3.5 / 2) - 0.1;
border1.position.z = -10;
border1.rotation.y = Math.PI;
scene.add(border1);

var border2 = new THREE.Mesh(borderGeometry, borderMaterial);
border2.position.y = (3.5 / 2) - 0.1;
border2.position.z = 10;
scene.add(border2);

var border3 = new THREE.Mesh(borderGeometry, borderMaterial);
border3.position.y = (3.5 / 2) - 0.1;
border3.position.z = 0;
border3.position.x = -10;
border3.rotation.y = Math.PI / 2;
scene.add(border3);

var border4 = new THREE.Mesh(borderGeometry, borderMaterial);
border4.position.y = (3.5 / 2) - 0.1;
border4.position.z = 0;
border4.position.x = 10;
border4.rotation.y = Math.PI / 2;
scene.add(border4);


var controls = new THREE.OrbitControls(camera, renderer.domElement);

var render = function () {

    requestAnimationFrame(render);

    renderer.render(scene, camera);

    controls.update();

};

render();
