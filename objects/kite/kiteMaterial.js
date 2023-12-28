import * as THREE from "three";

const KITE_MATERIAL = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.DoubleSide, transparent: true})

// load from image
const KITE_MATERIAL2 = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load( localStorage.getItem('kitie_texture') || '/assets/kitie/kittie3.png' ),
    side: THREE.DoubleSide,
    transparent: true
});

export default KITE_MATERIAL2