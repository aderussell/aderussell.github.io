/***  Toon Shader  ***/

class ToonShader extends Shader 
{
	constructor(lightDirection, color) {
		super();
		this.lightDirection = lightDirection;
		this.color = color;
	}
	

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
		var pixel  = input.position;
		var normal = input.normal;
		var color  = this.color;
		
		var light = clamp(vector3DotProduct(this.lightDirection, normal), 0.0, 1.0);
		
		
		if (light>0.85) light = 1;
        else if (light>0.60) light = 0.80;
        else if (light>0.45) light = 0.60;
        else if (light>0.30) light = 0.45;
        else if (light>0.15) light = 0.30;

		
		
		return colorIntensify(color, light);
	}
}
