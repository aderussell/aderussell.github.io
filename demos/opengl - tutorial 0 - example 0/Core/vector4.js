

// function Vector4(x,y,z,w) {
// 	this.init(x,y,z,w);
// }

class Vector4 {
	constructor(x, y, z, w) {
		this.x = x ? x : 0.0;
		this.y = y ? y : 0.0;
		this.z = z ? z : 0.0;
		this.w = w ? w : 0.0;
	}
	normaliseScale() {
		return vector4NormaliseScale(this);
	}
	transformByMatrix(m) {
		return vector4Transform(this, m);
	}
}

function vector4Transform(v, m) {
	var x = (v.x * m.a[0]) + (v.y * m.a[4]) + (v.z * m.a[8]) + (v.w * m.a[12]);
	var y = (v.x * m.a[1]) + (v.y * m.a[5]) + (v.z * m.a[9]) + (v.w * m.a[13]);
	var z = (v.x * m.a[2]) + (v.y * m.a[6]) + (v.z * m.a[10]) + (v.w * m.a[14]);
	var w = (v.x * m.a[3]) + (v.y * m.a[7]) + (v.z * m.a[11]) + (v.w * m.a[15]);
	return new Vector4(x, y, z, w);
}


function vector4NormaliseScale(v) {
	if (v.w == 0.0) return new Vector4(0,0,0,0);
	let invW = 1.0 / v.w;
	return new Vector4(v.x*invW, v.y*invW, v.z*invW, 1.0);
}




