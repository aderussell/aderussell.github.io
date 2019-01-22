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
		var binormal = vector3BarycentricInterpolate(i1.binormal, i2.binormal, i3.binormal, bar);
		var tangent  = vector3BarycentricInterpolate(i1.tangent,  i2.tangent,  i3.tangent,  bar);
		var uv       = vector2BarycentricInterpolate(i1.uv,       i2.uv,       i3.uv,       bar);
		
		var output      = {};
		output.position = position;
		output.normal   = normal;
		output.binormal = binormal;
		output.tangent  = tangent;
		output.uv       = uv;
		return output;
	}
	
	vertex(input) {
		
		var vertex = input.position;
		var normal = input.normal;
		var uv     = input.uv;

		var tangent = null;
		var c1 = vector3CrossProduct(normal, new Vector3(0,0,1));
		var c2 = vector3CrossProduct(normal, new Vector3(0,1,0));
		if (vectorSqrMagnitude(c1) > vectorSqrMagnitude(c2)) {
			tangent = c1;
		} else {
			tangent = c2;
		}
		tangent = vector3Normalise(tangent);

		var binormal = vector3CrossProduct(normal, tangent);
		binormal = vector3Normalise(binormal);

		
		var newVertex = vector4From3(vertex);
		newVertex = vector4Transform(newVertex, this.matrix);
		newVertex = vector4NormaliseScale(newVertex);
		newVertex = vector3From4(newVertex);
		
		var newNormal = vector4From3(normal);
		newNormal = vector4Transform(newNormal, this.matrix);
		newNormal = vector4NormaliseScale(newNormal);
		newNormal = vector3From4(newNormal);
		newNormal = vector3Normalise(newNormal);

		var newBinormal = vector4From3(binormal);
		newBinormal = vector4Transform(newBinormal, this.matrix);
		newBinormal = vector4NormaliseScale(newBinormal);
		newBinormal = vector3From4(newBinormal);
		newBinormal = vector3Normalise(newBinormal);

		var newTangent = vector4From3(tangent);
		newTangent = vector4Transform(newTangent, this.matrix);
		newTangent = vector4NormaliseScale(newTangent);
		newTangent = vector3From4(newTangent);
		newTangent = vector3Normalise(newTangent);
		
		//var varyingIntensity
		
		
		var output      = {};
		output.position = newVertex;
		output.normal   = newNormal;
		output.binormal = newBinormal;
		output.tangent  = newTangent;
		output.uv       = uv;
		return output;
	}
	
	pixel(input) {
	
		let textureColor = this.texture.getColor(input.uv.x, input.uv.y);
		var normals = this.normalMap.getColor(input.uv.x, input.uv.y);
		normals = new Vector3(normals.r, normals.g, normals.b);
		normals = vector3Subtract(vector3Multiply(normals, 2.0),  new Vector3(1,1,1));
		
		var x = vector3Multiply(input.tangent,  normals.x);
		var y = vector3Multiply(input.binormal, normals.y);
		var z = vector3Multiply(input.normal,   normals.z);
		var bumpNormals = vector3Add(vector3Add(x, y), z);
		bumpNormals = vector3Normalise(bumpNormals);

		let lightDirection = new Vector3(1,-1, 1);

		let lightIntensity = clamp(vector3DotProduct(bumpNormals, lightDirection), 0, 1);
		return colorIntensify(textureColor, lightIntensity);
	}
}
