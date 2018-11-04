/***  Phong  ***/

// function PhongShader(matrix, lights) {
// 	this.init(matrix, lights);
// }
class PhongShader extends Shader
{
	constructor(matrix, lights) {
		super();
		this.matrix = matrix;
		this.lights = lights;
		
		this.ambient  = new Color(0.1875, 0.1875, 0.1875);
		this.diffuse  = new Color(0.625, 0.625, 0.625);
		this.specular = new Color(1, 1, 1);
		this.Ns = 20;
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
		
		var v = input.position;
		var n = input.normal;
		
		var Ka = this.ambient;
		var Kd = this.diffuse;
		var Ks = this.specular;
		var Ns = this.Ns;
		var r = Ka.r;
 		var g = Ka.g;
 		var b = Ka.b;
 	
 	var lights = this.lights;
 	
 	for (var i = 0, len=lights.length; i < len; i++) {
 		
 		var light = lights[i];
 		
 		var lightPos = light.position;
 		
 		var lightDistance = vector3Distance(v, lightPos);
 		//console.log(lightDistance);
 		
 		var lightDirection = vector3Subtract(lightPos, v);
 		
 		var lightIntensity = light.intensity;
     	
		v = vector3Multiply(v, -1);
		v = vector3Normalise(v);
	 
		var h_a = vector3Add(lightDirection, v);
		var h = vector3Normalise(h_a);
	 
	 
		var shininess = Math.pow(Math.max(vector3DotProduct(h, n), 0.0), Ns);
		
		var ddp = Math.max(vector3DotProduct(lightDirection, n), 0.0);
	 
		r += (Kd.r * ddp * light.color.r * lightIntensity) + (Ks.r * shininess * light.color.r * lightIntensity);
		g += (Kd.g * ddp * light.color.g * lightIntensity) + (Ks.g * shininess * light.color.g * lightIntensity);
		b += (Kd.b * ddp * light.color.b * lightIntensity) + (Ks.b * shininess * light.color.b * lightIntensity);
 		
 	}
 	
 	return new Color(r,g,b);
		
	}
}