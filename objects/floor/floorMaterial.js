import * as THREE from "three";

const floorTexture = new THREE.TextureLoader().load('assets/img/grass.jpeg');
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);

const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({map: floorTexture, side: THREE.DoubleSide, transparent: true})

export default FLOOR_MATERIAL