
// function Matrix44(a) {
// 	this.init(a);
// }

class Matrix44 {
	constructor(a) {
		this.a = a ? a : Array.apply(null, new Array(16)).map(Number.prototype.valueOf,0);
	}
}


function matrixMultiply(m1, m2) {

	var result = new Matrix44();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            for (var k = 0; k < 4; k++) {
                result.a[i*4+j] += m1.a[i*4+k] * m2.a[k*4+j];
            }
        }
    }
    return result;

}


function matrixIdentity() {
	return new Matrix44([ 1,0,0,0,
						  0,1,0,0,
						  0,0,1,0,
						  0,0,0,1 ]);
}

function matrixTranslation(x,y,z) {
	return new Matrix44([ 1,0,0,0,
						  0,1,0,0,
						  0,0,1,0,
						  x,y,z,1 ]);	
}


function matrixScale(x,y,z) {
	return new Matrix44([ x,0,0,0,
						  0,y,0,0,
						  0,0,z,0,
						  0,0,0,1 ]);	
}


function matrixRotX(a)
{
    return new Matrix44([1, 0,       0,      0,
                    0, Math.cos(a),  Math.sin(a), 0,
                    0, -Math.sin(a), Math.cos(a), 0,
                    0, 0,       0,      1]);
}

function matrixRotY(a)
{
    return new Matrix44([Math.cos(a), 0, -Math.sin(a), 0,
                    0,      1, 0,       0,
                    Math.sin(a), 0, Math.cos(a),  0,
                    0,      0, 0,       1]);
}


function matrixRotZ(a)
{
    return new Matrix44([Math.cos(a),  Math.sin(a), 0, 0,
                    -Math.sin(a), Math.cos(a), 0, 0,
                    0,       0,      1, 0,
                    0,       0,      0, 1]);
}

function matrixRotRollPitchYaw(r, p, y) {

	var yaw   = matrixRotZ(-y);
	var pitch = matrixRotY(-p);
	var roll  = matrixRotX(-r); 

	return matrixMultiply(matrixMultiply(yaw, pitch), roll);

}

/*
    Vector3 zAxis = (target - position).normalise();
    Vector3 xAxis = Vector3::crossProduct(upVector, zAxis).normalise();
    Vector3 yAxis = Vector3::crossProduct(zAxis, xAxis);
    
    return Matrix44(xAxis.x, yAxis.x, zAxis.x, 0,
                    xAxis.y, yAxis.y, zAxis.y, 0,
                    xAxis.z, yAxis.z, zAxis.z, 0,
                    -Vector3::dotProduct(xAxis, position), -Vector3::dotProduct(yAxis, position), -Vector3::dotProduct(yAxis, position), 1);
*/

/*
Vec3f z = (eye-center).normalize();
    Vec3f x = cross(up,z).normalize();
    Vec3f y = cross(z,x).normalize();
    Matrix Minv = Matrix::identity();
    Matrix Tr   = Matrix::identity();
    for (int i=0; i<3; i++) {
        Minv[0][i] = x[i];
        Minv[1][i] = y[i];
        Minv[2][i] = z[i];
        Tr[i][3] = -center[i];
    }
    ModelView = Minv*Tr;
*/

function matrixLookAt(position, target, upVector) {
	
	var zAxis = vector3Normalise(vector3Subtract(target, position));
    var xAxis = vector3NormalisedCrossProduct(upVector, zAxis);
    var yAxis = vector3CrossProduct(zAxis, xAxis);
    
    return new Matrix44([xAxis.x, yAxis.x, zAxis.x, 0,
                        xAxis.y, yAxis.y, zAxis.y, 0,
                        xAxis.z, yAxis.z, zAxis.z, 0,
                    -vector3DotProduct(xAxis, position), -vector3DotProduct(yAxis, position), -vector3DotProduct(zAxis, position), 1]);
}


function matrixPerspective(fov, aspect, nearZ, farZ) {

	var mtx = new Matrix44();

    var h = (1 / Math.tan(fov/2.0));
    var w = h / aspect;
    

    mtx.a[0] = w;
    mtx.a[1] = 0.0;
    mtx.a[2] = 0.0;
    mtx.a[3] = 0.0;
    
    mtx.a[4] = 0.0;
    mtx.a[5] = h;
    mtx.a[6] = 0.0;
    mtx.a[7] = 0.0;
    
    mtx.a[8] = 0.0;
    mtx.a[9] = 0.0;
    mtx.a[10] = (farZ) / (farZ - nearZ);
    mtx.a[11] = 1.0;
    
    mtx.a[12] = 0.0;
    mtx.a[13] = 0.0;
    mtx.a[14] = -farZ * nearZ / (farZ - nearZ);
    mtx.a[15] = 0.0;
    
    return mtx;
}