import * as THREE from "three";

const KITE_GEOMETRY = new THREE.PlaneGeometry(2, 2);
KITE_GEOMETRY.rotateZ(Math.PI / 180 * 45);



export default KITE_GEOMETRY