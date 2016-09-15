function makeFloor() {


var vertices = [];
for (var x = -1.0; x <= 1.0; x+=0.1) {
	for (var z = -1.0; z <= 1.0; z+=0.1) {
		var vector = new Vector3(x, 0.0, z);
		vertices.push(vector);
	}
}

var indices = [];
for (var z = 0.0; z < 20.0; z++) {
	for (var x = 0.0; x < 20.0; x++) {
		indices.push(x   + (z*21));
		indices.push(x+1 + (z*21));
		indices.push(x+1 + ((z+1)*21));
		indices.push(x   + ((z+1)*21));
	}
}


return new Mesh(vertices, indices, false);
}