import * as THREE from "three";

function createMesh(geometry, material, position, rotation, transparent = false) {
	const mesh = new THREE.Mesh(geometry, material);

	mesh.position.copy(position);
	mesh.rotation.copy(rotation);
	mesh.material.transparent = transparent;

	return mesh;
}

export default createMesh