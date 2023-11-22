import * as THREE from "three";

const skyBoxTexture = new THREE.TextureLoader().load('assets/img/skybox.png');
skyBoxTexture.wrapS = THREE.RepeatWrapping;
skyBoxTexture.wrapT = THREE.RepeatWrapping;

const skyBoxMaterial = new THREE.MeshBasicMaterial({
	map: skyBoxTexture,
	side: THREE.DoubleSide,
	transparent: true,
	premultipliedAlpha: true
});
export default skyBoxMaterial