

// function Vector3(x,y,z) {
// 	this.init(x,y,z);
// }

class Vector3 {
	constructor(x, y, z) {
		this.x = x ? x : 0.0;
		this.y = y ? y : 0.0;
		this.z = z ? z : 0.0;
	}
}



function vector3Normal(v) {
	return new Vector3(-v.y, v.x, v.z);
}

function vector3Add(v1, v2) {
	return new Vector3(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
}

function vector3Subtract(v1, v2) {
	return new Vector3(v1.x-v2.x, v1.y-v2.y, v1.z-v2.z);
}

function vector3Multiply(v1, s) {
	return new Vector3(v1.x * s, v1.y * s, v1.z * s);
}

function vector3Divide(v1, s) {
	return new Vector3(v1.x / s, v1.y / s, v1.z / s);
}

function vector3Distance(v1, v2) {
    var distx = (v2.x - v1.x);
    var disty = (v2.y - v1.y);
    var distz = (v2.z - v1.z);
    return Math.sqrt( (distx * distx) + (disty * disty) + (distz * distz) );
}

function vector3Clamp(v1, min, max) {
    return new Vector3(clamp(v1.x, min, max), clamp(v1.y, min, max), clamp(v1.z, min, max));
}


function vectorSqrMagnitude(v) {
	return (v.x*v.x) + (v.y*v.y) + (v.z*v.z);
}

function vectorMagnitude(v) {
	return Math.sqrt(vectorSqrMagnitude(v));
}

function vectorNormalise(v) {
    return (v.x == 0.0 && v.y == 0.0 && v.z == 0.0) ? v : vectorDivide(v, vectorMagnitude(v));
}

function vector3Normalise(v) {
    return (v.x == 0.0 && v.y == 0.0 && v.z == 0.0) ? v : vectorDivide(v, vectorMagnitude(v));
}

function vector3DotProduct(v1, v2)
{
	return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
}

function vector3CrossProduct(v1, v2) {
	return new Vector3(v1.y*v2.z - v1.z*v2.y, v1.z*v2.x - v1.x*v2.z, v1.x*v2.y - v1.y*v2.x);
}

function vector3NormalisedCrossProduct(v1, v2) {
	return vectorNormalise(vector3CrossProduct(v1, v2));
}


function vectorAdd(v1, v2) {
	return new Vector3(v1.x+v2.x, v1.y+v2.y, v1.z+v2.z);
}

function vectorDivide(v1, s) {
	return new Vector3(v1.x / s, v1.y / s, v1.z / s);
}
