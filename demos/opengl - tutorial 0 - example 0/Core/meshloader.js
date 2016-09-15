
Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

class MeshLoader {

	constructor() {
		this.xhr = new XMLHttpRequest();
		
		this.vertices = [];
		this.normals = [];
		this.textureCoords = [];
		this.indicies = [];
	}

	load(filename) {
		this.xhr.open("GET", filename);
		this.xhr.onload = this.didLoad;
		this.xhr.send(null);
	}
	
	didLoad() {
		makeMesh(this.xhr.responseText);
	}
	
	
	finalMesh() {
	
		if (this.finalMeshObj) {
			return this.finalMeshObj;
		}
	
		this.produceLinearMesh();
		
		return this.finalMeshObj;
	}
	
	makeMesh(input) {
		var components = input.split("\n");
		components.forEach(this.readLine, this);
		
		this.produceLinearMesh();
	}
	
	readLine(line, index) {
		
		var components = line.split(" ");
		
		var type = components.shift();
		
		// removes any components that are just empty strings
		components = components.clean("");
		
		switch(type) {
			case "v":
				this.readVertex(components);
				break;
			case "vt":
				this.readTex(components);
				break;
			case "vn":
				this.readNormal(components);
				break;
			case "f":
				this.readFace(components);
				break;
			case "g":
				this.readGroup(components);
				break;
			case "o":
				this.readObject(components);
				break;
		}
		
	}
	
	
	readVertex(components) {
		var w = 1.0;
		if (components.length == 4) {
			w = parseFloat(components[3]);
		}
		
		var x = parseFloat(components[0]);
		var y = parseFloat(components[1]);
		var z = parseFloat(components[2]);
		
		var vector = new Vector3(x*w, y*w, z*w);
		
		this.vertices.push(vector);
	}
	
	readTex(components) {
		var x = parseFloat(components[0]);
		var y = parseFloat(components[1]);
		
		var vector = new Vector2(x, y);
		
		this.textureCoords.push(vector);
	}
	
	readNormal(components) {
		var x = parseFloat(components[0]);
		var y = parseFloat(components[1]);
		var z = parseFloat(components[2]);
		
		var vector = new Vector3(x, y, z);
		
		this.normals.push(vector);
	}
	
	readFace(components) {
	
		if (components.length >= 3) {
			for (var x= 1; x < components.length - 1; x++) {
				this.readFaceComponent(components[0]);
				this.readFaceComponent(components[x+1]);
				this.readFaceComponent(components[x]);
			}
		}
	}
	
	readFaceComponent(component) {
		var components = component.split("/");
		var index   = parseInt(components[0]) - 1;
		var texture = parseInt(components[1]) - 1;
		var normal  = parseInt(components[2]) - 1;
		
		
		var vertex = new Vector3(index, texture, normal);
		
		
		this.indicies.push(vertex);
	}
	
	
	readGroup(components) {
	
	}
	
	readObject(components) {
	
	}
	
	
	
	produceLinearMesh() {
		var output = [];
		var newIndex = [];
	
		var map = new Map();
	
		for (var i = 0; i < this.indicies.length; i++) {
		
			
			var index = this.indicies[i];
			
			var indexString = index.x.toString() + "," + index.y.toString() + "," + index.z.toString();
			
			if (map.has(indexString)) {
				index = map.get(indexString);
				newIndex.push(index);
			} else {
			
			
				var vertexObject = { position: this.vertices[index.x], uv: this.textureCoords[index.y], normal: this.normals[index.z] };
				output.push(vertexObject);
				var outputLastIndex = output.length - 1;
				newIndex.push(outputLastIndex);
				map.set(indexString, outputLastIndex);
			}
		}
		
		this.finalMeshObj = new Mesh(output, newIndex);
	}
}