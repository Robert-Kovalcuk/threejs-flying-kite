import * as CANNON from "cannon"
function createCannonBody(mesh, mass = 0, customShape, customBody) {
	const shape = customShape ?? new CANNON.Box(new CANNON.Vec3().copy(mesh.geometry.parameters));
	const body = customBody ?? new CANNON.Body({ mass, shape, linearDamping: 0.31 });

	body.addShape(shape)
	body.position.copy(mesh.position);
	body.quaternion.copy(mesh.quaternion);

	return body;
}



export default createCannonBody