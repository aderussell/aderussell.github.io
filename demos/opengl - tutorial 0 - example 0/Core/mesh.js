


// function Mesh(vertices, indices, calcNormals) {
// 	this.init(vertices, indices, calcNormals);
// }

class Mesh {

	constructor(vertexBuffer, indexBuffer) {
		this.vertexBuffer = vertexBuffer;
		this.indexBuffer  = indexBuffer;
	}
	
	calculateNormals() {
		_calculateNormals(this.vertexBuffer, this.indexBuffer);
	}
}





// function getMidpointIndex(vertices, i0, i1)
// {
// 	var v0 = vertices[i0];
// 	var v1 = vertices[i1];
// 	var midpoint =  vectorDivide( vectorAdd(v0, v1), 2.0 );
// 
// 
// 	var index = vertices.indexOf(midpoint);
// 	if (index >= 0) {
// 		return index;
// 	} else {
// 		var newIndex = vertices.length;
// 		vertices.push(midpoint);
// 		return newIndex;
// 	}
// }
// 
// 
// 
// function subdivideExt(vertices, indices) {
// 
// 	var newIndices = [];
// 	
// 	// copy the vertices array
// 	var newVertices = vertices.slice(0);
// 	
// 	for (var i = 0; i < indices.length - 2; i += 3)
// 	{
// 		var i0 = indices[i];
// 		var i1 = indices[i + 1];
// 		var i2 = indices[i + 2];
// 
// 		var m01 = getMidpointIndex(newVertices, i0, i1);
// 		var m12 = getMidpointIndex(newVertices, i1, i2);
// 		var m02 = getMidpointIndex(newVertices, i2, i0);
// 
// 		var newStuff = [
// 				i0,  m01, m02,
// 				i1,  m12, m01,
// 				i2,  m02, m12,
// 				m02, m01, m12
// 			];
// 
// 		newIndices = newIndices.concat(newStuff);
// 
// 	}
// 	
// 	
// 	return { vertices: newVertices, indices: newIndices };
// }




function _calculateNormals(vertices, indices)
{
    var normal_buffer = [];
    for (var i = 0, len = vertices.length; i < len; i++) {
    	normal_buffer.push([]);
    }
    
    for (var i = 0, len = indices.length; i < len; i+=3) {
        
        var faceX = indices[i];
        var faceY = indices[i+1];
        var faceZ = indices[i+2];
        
        var v1 = vector3Subtract(vertices[faceY].position, vertices[faceX].position);
        var v2 = vector3Subtract(vertices[faceZ].position, vertices[faceX].position);
        var normal = vector3NormalisedCrossProduct(v1, v2);
        
        //faceX.y = faceX.x;
        //faceY.y = faceY.x;
        //faceZ.y = faceZ.x;
        
        normal_buffer[faceX].push(normal);
        normal_buffer[faceY].push(normal);
        normal_buffer[faceZ].push(normal);
    }
    
    for (var i = 0, len = vertices.length; i < len; i++) {
    	var normal = new Vector3();
        for (var j = 0, len2 = normal_buffer[i].length; j < len2; j++) {
        	normal = vector3Add(normal, normal_buffer[i][j]);
        }
        normal = vectorNormalise(normal);
        vertices[i].normal = normal;
    }
}

function calculateTangentsAndBinormals(vertices, indices)
{
	// TODO: add this method
}

/*

void Mesh::calculateTangentsAndBinormals()
{
	std::vector<Vertex> newVertices(0);

	int faceCount = vertices.size() / 3;
	int index = 0;
	for (int i = 0; i < faceCount; i++) {
		SimpleVertex v1 = vertices[index++];
		SimpleVertex v2 = vertices[index++];
		SimpleVertex v3 = vertices[index++];

		XMFLOAT3 tangent;
		XMFLOAT3 binormal;

		calculateTangentAndBiNormal(v1, v2, v3, tangent, binormal);

		// create the other type here
		Vertex vertex1;
		vertex1.position  = v1.Pos;
		vertex1.textureUV = v1.TexUV;
		vertex1.normal    = v1.VecNormal;
		vertex1.tangent   = tangent;
		vertex1.binormal  = binormal;

		Vertex vertex2;
		vertex2.position  = v2.Pos;
		vertex2.textureUV = v2.TexUV;
		vertex2.normal    = v2.VecNormal;
		vertex2.tangent   = tangent;
		vertex2.binormal  = binormal;

		Vertex vertex3;
		vertex3.position  = v3.Pos;
		vertex3.textureUV = v3.TexUV;
		vertex3.normal    = v3.VecNormal;
		vertex3.tangent   = tangent;
		vertex3.binormal  = binormal;

		newVertices.push_back(vertex1);
		newVertices.push_back(vertex2);
		newVertices.push_back(vertex3);
	}
	vertices_NEW = newVertices;
}

void calculateTangentAndBiNormal(SimpleVertex v1, SimpleVertex v2, SimpleVertex v3, XMFLOAT3 &tangent, XMFLOAT3 &binormal)
{
	float vector1[3], vector2[3];
	float tuVector[2], tvVector[2];
	float den;
	float length;


	// Calculate the two vectors for this face.
	vector1[0] = v2.Pos.x - v1.Pos.x;
	vector1[1] = v2.Pos.y - v1.Pos.y;
	vector1[2] = v2.Pos.z - v1.Pos.z;

	vector2[0] = v3.Pos.x - v1.Pos.x;
	vector2[1] = v3.Pos.y - v1.Pos.y;
	vector2[2] = v3.Pos.z - v1.Pos.z;

	// Calculate the tu and tv texture space vectors.
	tuVector[0] = v2.TexUV.x - v1.TexUV.x;
	tvVector[0] = v2.TexUV.y - v1.TexUV.y;

	tuVector[1] = v3.TexUV.x - v1.TexUV.x;
	tvVector[1] = v3.TexUV.y - v1.TexUV.y;

	// Calculate the denominator of the tangent/binormal equation.
	den = 1.0f / (tuVector[0] * tvVector[1] - tuVector[1] * tvVector[0]);

	// Calculate the cross products and multiply by the coefficient to get the tangent and binormal.
	tangent.x = (tvVector[1] * vector1[0] - tvVector[0] * vector2[0]) * den;
	tangent.y = (tvVector[1] * vector1[1] - tvVector[0] * vector2[1]) * den;
	tangent.z = (tvVector[1] * vector1[2] - tvVector[0] * vector2[2]) * den;

	binormal.x = (tuVector[0] * vector2[0] - tuVector[1] * vector1[0]) * den;
	binormal.y = (tuVector[0] * vector2[1] - tuVector[1] * vector1[1]) * den;
	binormal.z = (tuVector[0] * vector2[2] - tuVector[1] * vector1[2]) * den;

	// Calculate the length of this normal.
	length = sqrt((tangent.x * tangent.x) + (tangent.y * tangent.y) + (tangent.z * tangent.z));
			
	// Normalize the normal and then store it
	tangent.x = tangent.x / length;
	tangent.y = tangent.y / length;
	tangent.z = tangent.z / length;

	// Calculate the length of this normal.
	length = sqrt((binormal.x * binormal.x) + (binormal.y * binormal.y) + (binormal.z * binormal.z));
			
	// Normalize the normal and then store it
	binormal.x = binormal.x / length;
	binormal.y = binormal.y / length;
	binormal.z = binormal.z / length;

	return;
}


*/