import * as THREE from "three";

const kiteTexture = new THREE.TextureLoader().load('assets/img/sky.jpg');
kiteTexture.wrapS = THREE.RepeatWrapping;
kiteTexture.wrapT = THREE.RepeatWrapping;
kiteTexture.repeat.set(10, 10);

const KITE_MATERIAL = new THREE.MeshBasicMaterial({map: kiteTexture, side: THREE.DoubleSide, transparent: true})

export default KITE_MATERIAL