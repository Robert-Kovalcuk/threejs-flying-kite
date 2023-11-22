import * as THREE from "three";

const sphereTexture = new THREE.TextureLoader().load('/assets/img/sky.jpg');
const SKY_MATERIAL = new THREE.MeshBasicMaterial({map: sphereTexture, transparent: true, side: THREE.DoubleSide});

export default SKY_MATERIAL

