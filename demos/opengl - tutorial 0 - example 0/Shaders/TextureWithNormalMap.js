class TextureWithNormalMapShader extends Shader 
{
	constructor(texture, normalMap) {
		super();
		this.texture   = texture;
		this.normalMap = normalMap;
	}
	

	interpolate(i1, i2, i3, bar) {
		
		var position = vector3BarycentricInterpolate(i1.position, i2.position, i3.position, bar);
		var normal   = vector3BarycentricInterpolate(i1.normal,   i2.normal,   i3.normal,   bar);
		var uv       = vector2BarycentricInterpolate(i1.uv,       i2.uv,       i3.uv,       bar);
		
		var output      = {};
		output.position = position;
		output.normal   = normal;
		output.uv       = uv;
		return output;
	}
	
	vertex(input) {
		
		var vertex = input.position;
		var normal = input.normal;
		var uv     = input.uv;
		
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
		output.uv       = uv;
		return output;
	}
	
	pixel(input) {
	
		return this.texture.getColor(input.uv.x, input.uv.y);
	}
}
