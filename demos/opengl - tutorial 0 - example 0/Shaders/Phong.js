/***  Phong  ***/

// function PhongShader(matrix, lights) {
// 	this.init(matrix, lights);
// }
class PhongShader extends Shader
{
	constructor(light) {
		super();
		this.light = light;
		
		this.ambient  = new Color(0.1875, 0.0, 0.0);
		this.diffuse  = new Color(1, 0, 0);
		this.specular = new Color(1, 1, 1);
		this.Ns = 32;
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
 	
 	//var lights = this.lights;
 	
 	//for (var i = 0, len=lights.length; i < len; i++) {
 		
 		var light = this.light;
 		var lightIntensity = light.intensity;
 		var lightPos = light.position;
 		
 		var lightDirection = vector3Subtract(lightPos, v);
 		lightDirection = vector3Normalise(lightDirection);
		
		
	 
	 	// diffuse
		var ddp = Math.min(1.0, Math.max(vector3DotProduct(n, lightDirection), 0.0));
	 
	 	// specular
	 	var viewDir = vector3Multiply(v, -1);
		viewDir = vector3Normalise(v);
		var h_a = vector3Add(lightDirection, viewDir);
		var h = vector3Normalise(h_a);
		var shininess = Math.pow(Math.max(vector3DotProduct(h, n), 0.0), Ns);
		
		
	 
		r += (Kd.r * ddp * light.color.r * lightIntensity) + (Ks.r * shininess * light.color.r * lightIntensity);
		g += (Kd.g * ddp * light.color.g * lightIntensity) + (Ks.g * shininess * light.color.g * lightIntensity);
		b += (Kd.b * ddp * light.color.b * lightIntensity) + (Ks.b * shininess * light.color.b * lightIntensity);
 		
 	//}
 	
 	return new Color(r,g,b);
		
	}
}