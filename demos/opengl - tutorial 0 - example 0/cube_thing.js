
function makeCubeThing3() {

	var indices  = [];
	var vertices = [];


// 	for (var x = 0; x < 10; x++) {
// 		for (var y = 0; y < 10; y++) {
// 			for (var z = 0; z < 10; z++) {
// 			
				var x1 = 0;
				var y1 = 0;
				var z1 = 0;
				
				var x2 = 1;
				var y2 = 1;
				var z2 = 1;
			
				vertices.push(new Vector3(x1, y1, z1));
				vertices.push(new Vector3(x1, y2, z1));
				vertices.push(new Vector3(x2, y2, z1));
				vertices.push(new Vector3(x2, y1, z1));
				vertices.push(new Vector3(x1, y1, z2));
				vertices.push(new Vector3(x1, y2, z2));
				vertices.push(new Vector3(x2, y2, z2));
				vertices.push(new Vector3(x2, y1, z2));
				
				//var offset = ((x*100) + (y*10) + z) * 8;
				
				
				var indicesMask = [0, 1, 2,
                               0, 2, 3,
                               1, 0, 5,
                               0, 4, 5,
                               6, 5, 4,
                               6, 4, 7,
                               3, 2, 6,
                               3, 6, 7,
                               0, 3, 4,
                               3, 7, 4,
                               1, 5, 6,
                               6, 2, 1];
                               
                indicesMask = indicesMask.reverse();
                               
            	//var offsetInidicies = indicesMask.map(function(val){ return val + offset; });
            	
            	indices = indicesMask;
// 			}
// 		}
// 	}

	return new Mesh(vertices, indices);
}

function makeCubeThing2() {

	var indices  = [];
	var vertices = [];


	for (var x = 0; x < 10; x++) {
		for (var y = 0; y < 10; y++) {
			for (var z = 0; z < 10; z++) {
			
				var x1 = (0.2 * x) - 1.0;
				var y1 = (0.2 * y) - 1.0;
				var z1 = (0.2 * z) - 1.0;
				
				var x2 = (0.2 * x) - 1.0 + 0.075;
				var y2 = (0.2 * y) - 1.0 + 0.075;
				var z2 = (0.2 * z) - 1.0 + 0.075;
			
				vertices.push(new Vector3(x1, y1, z1));
				vertices.push(new Vector3(x1, y2, z1));
				vertices.push(new Vector3(x2, y2, z1));
				vertices.push(new Vector3(x2, y1, z1));
				vertices.push(new Vector3(x1, y1, z2));
				vertices.push(new Vector3(x1, y2, z2));
				vertices.push(new Vector3(x2, y2, z2));
				vertices.push(new Vector3(x2, y1, z2));
				
				var offset = ((x*100) + (y*10) + z) * 8;
				
				
				var indicesMask = [0, 1, 2,
                               0, 2, 3,
                               1, 0, 5,
                               0, 4, 5,
                               6, 5, 4,
                               6, 4, 7,
                               3, 2, 6,
                               3, 6, 7,
                               0, 3, 4,
                               3, 7, 4,
                               1, 5, 6,
                               6, 2, 1];
                               
                indicesMask = indicesMask.reverse();
                               
            	var offsetInidicies = indicesMask.map(function(val){ return val + offset; });
            	
            	indices = indices.concat(offsetInidicies);
			}
		}
	}

	return new Mesh(vertices, indices);
}

function makeCubeThing() {

	var indices  = [];
	var vertices = [];


	for (var x = 0; x < 5; x++) {
		for (var y = 0; y < 5; y++) {
			for (var z = 0; z < 5; z++) {
			
				var x1 = (0.4 * x) - 1.0;
				var y1 = (0.4 * y) - 1.0;
				var z1 = (0.4 * z) - 1.0;
				
				var x2 = (0.4 * x) - 1.0 + 0.3;
				var y2 = (0.4 * y) - 1.0 + 0.3;
				var z2 = (0.4 * z) - 1.0 + 0.3;
			
				vertices.push(new Vector3(x1, y1, z1));
				vertices.push(new Vector3(x1, y2, z1));
				vertices.push(new Vector3(x2, y2, z1));
				vertices.push(new Vector3(x2, y1, z1));
				vertices.push(new Vector3(x1, y1, z2));
				vertices.push(new Vector3(x1, y2, z2));
				vertices.push(new Vector3(x2, y2, z2));
				vertices.push(new Vector3(x2, y1, z2));
				
				var offset = ((x*25) + (y*5) + z) * 8;
				
				
				var indicesMask = [0, 1, 2,
                               0, 2, 3,
                               1, 0, 5,
                               0, 4, 5,
                               6, 5, 4,
                               6, 4, 7,
                               3, 2, 6,
                               3, 6, 7,
                               0, 3, 4,
                               3, 7, 4,
                               1, 5, 6,
                               6, 2, 1];
                               
                indicesMask = indicesMask.reverse();
                               
            	var offsetInidicies = indicesMask.map(function(val){ return val + offset; });
            	
            	indices = indices.concat(offsetInidicies);
			}
		}
	}

	return new Mesh(vertices, indices);
}