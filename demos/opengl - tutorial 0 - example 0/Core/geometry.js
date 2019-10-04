
function vector4From3(v) 
{
	return new Vector4(v.x,v.y,v.z,1.0);
}

function vector3From4(v) {
	return new Vector3(v.x,v.y,v.z);
}


function faceNormal(v1, v2, v3)
{
	var vt1 = new Vector3(v1.x, v1.y, v1.z);
    var vt2 = new Vector3(v2.x, v2.y, v2.z);
    var vt3 = new Vector3(v3.x, v3.y, v3.z);
    
    vt1 = vector3Divide(vt1, v1.w);
    vt2 = vector3Divide(vt2, v2.w);
    vt3 = vector3Divide(vt3, v3.w);
    
    var n1 = vector3Subtract(vt2, vt1);
    var n2 = vector3Subtract(vt3, vt1);
        
    return vector3NormalisedCrossProduct(n1, n2);
}

function faceAverage(v1, v2, v3)
{
	var vt1 = new Vector3(v1.x, v1.y, v1.z);
    var vt2 = new Vector3(v2.x, v2.y, v2.z);
    var vt3 = new Vector3(v3.x, v3.y, v3.z);
    
    vt1 = vector3Divide(vt1, v1.w);
    vt2 = vector3Divide(vt2, v2.w);
    vt3 = vector3Divide(vt3, v3.w);

	var avgX = (vt1.x + vt2.x + vt3.x) / 3.0;
    var avgY = (vt1.y + vt2.y + vt3.y) / 3.0;
    var avgZ = (vt1.z + vt2.z + vt3.z) / 3.0;
        
    return new Vector3(avgX, avgY, avgZ);
}


function clamp(value, min, max) 
{
	return Math.min(Math.max(value, min), max);
}

function lerp(a, b, t)
{
	return a + ((b-a)*t);
}
