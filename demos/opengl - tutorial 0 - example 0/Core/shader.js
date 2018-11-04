

function vector2BarycentricInterpolate(v1, v2, v3, bar) {
	var x = (v1.x*bar.x) + (v2.x*bar.y) + (v3.x*bar.z);
	var y = (v1.y*bar.x) + (v2.y*bar.y) + (v3.y*bar.z);
	return new Vector2(x,y);
}


function vector3BarycentricInterpolate(v1, v2, v3, bar) {
	var x = (v1.x*bar.x) + (v2.x*bar.y) + (v3.x*bar.z);
	var y = (v1.y*bar.x) + (v2.y*bar.y) + (v3.y*bar.z);
	var z = (v1.z*bar.x) + (v2.z*bar.y) + (v3.z*bar.z);	
	return new Vector3(x,y,z);
}

function vector4BarycentricInterpolate(v1, v2, v3, bar) {
	var x = (v1.x*bar.x) + (v2.x*bar.y) + (v3.x*bar.z);
	var y = (v1.y*bar.x) + (v2.y*bar.y) + (v3.y*bar.z);
	var z = (v1.z*bar.x) + (v2.z*bar.y) + (v3.z*bar.z);	
	var w = (v1.w*bar.x) + (v2.w*bar.y) + (v3.w*bar.z);	
	return new Vector4(x,y,z,w);
}


class Shader {
	interpolate(i1, i2, i3, bar) { }
	vertex(input) { }
	pixel(input) { }
}


