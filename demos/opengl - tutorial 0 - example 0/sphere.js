

function makeSphere() {

	var X = 0.525731112119133606;
	var Z = 0.850650808352039932;
	
	var indices = [
			0,4,1,
			0,9,4,
			9,5,4,
			4,5,8,
			4,8,1,
			8,10,1,
			8,3,10,
			5,3,8,
			5,2,3,
			2,7,3,
			7,10,3,
			7,6,10,
			7,11,6,
			11,0,6,
			0,1,6,
			6,1,10,
			9,0,11,
			9,11,2,
			9,2,5,
			7,2,11 
		];

	indices = indices.reverse();


	var vertices =[ 
			new Vector3(-X, 0.0, Z),
			new Vector3(X, 0.0, Z),
			new Vector3(-X, 0.0, -Z),
			new Vector3(X, 0.0, -Z),
			new Vector3(0.0, Z, X),
			new Vector3(0.0, Z, -X),
			new Vector3(0.0, -Z, X),
			new Vector3(0.0, -Z, -X),
			new Vector3(Z, X, 0.0),
			new Vector3(-Z, X, 0.0),
			new Vector3(Z, -X, 0.0),
			new Vector3(-Z, -X, 0.0) 
		];
		
		
	var baseMesh = new Mesh(vertices, indices);
	
	var mesh = baseMesh.subdivide(4, true);

	var texs = [];

	for (var i=0, len=mesh.vertices.length; i<len; i++) {
		var n = mesh.vertices[i];
		var u = Math.atan2(n.x, n.z) / (2 * Math.PI) + 0.5;
		var v = n.y * 0.5 + 0.5;
		var uv = new Vector2(u, v);
		texs.push(uv);
	}


	mesh.textureCoords = texs;

	// calculate the uv coords

	return mesh;
}

