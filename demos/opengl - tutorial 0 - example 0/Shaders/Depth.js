class DepthBufferShader extends Shader 
{
	constructor(matrix, lightDirection) {
		super();
		this.matrix = matrix;
		this.lightDirection = lightDirection;
		this.color = new Color(1, 1, 1);
	}
	
// 	vertexInput: {
// 		position: 'position',
// 		normal:   'normal'
// 	},
// 	pixelInput: {
// 		position: 'position',
// 		normal:   'normal'
// 	},
	interpolate(i1, i2, i3, bar) {
		
		var position = vector3BarycentricInterpolate(i1.position, i2.position, i3.position, bar);
		var normal   = vector3BarycentricInterpolate(i1.normal,   i2.normal,   i3.normal,   bar);
		
		var output      = {};
		output.position = position;
		output.normal   = normal;
		return output;
	}
	
	vertex(input) {
		
		var vertex = input.position;
		var normal = input.normal;
		
		var newVertex = vector4From3(vertex);
		newVertex = vector4Transform(newVertex, this.matrix);
		newVertex = vector4NormaliseScale(newVertex);
		newVertex = vector3From4(newVertex);
		
		var newNormal = vector4From3(normal);
		newNormal = vector4Transform(newNormal, this.matrix);
		newNormal = vector4NormaliseScale(newNormal);
		newNormal = vector3From4(newNormal);
		newNormal = vector3Normalise(newNormal);
		
		//var varyingIntensity
		
		
		var output      = {};
		output.position = newVertex;
		output.normal   = newNormal;
		return output;
	}
	
	pixel(input) {
	
		var depth = input.position.z;
		var d = 1 - depth;
		d *= 100;
		return new Color(d, d, d);
	}
}