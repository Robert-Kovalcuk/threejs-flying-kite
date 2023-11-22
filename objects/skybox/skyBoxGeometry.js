import * as THREE from "three";

export const borderGeometryConfig = {
	width: 20,
	height: 3.5,
	widthSeg: 1,
	heightSeg: 1
}

const skyBoxGeometry = new THREE.PlaneGeometry(
	borderGeometryConfig.width,
	borderGeometryConfig.height,
	borderGeometryConfig.widthSeg,
	borderGeometryConfig.heightSeg
)

export default skyBoxGeometry