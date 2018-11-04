

const CULL_MODE_NONE  = 0;
const CULL_MODE_FRONT = 1;
const CULL_MODE_BACK  = 2;



class RenderingContext {

	constructor(canvas, ctx) {
		this.canvas = canvas;
		this.context = ctx;
		this.width = canvas.clientWidth;
		this.height = canvas.clientHeight;
		
		canvas.width = this.width;
		canvas.height = this.height;
		
		this.cullMode = CULL_MODE_NONE;
		
		
		this.contextData = ctx.getImageData(0, 0, this.width, this.height);
		
		
		// create the color buffer
		this.colorBuffer = this.contextData.data;
		
		
		
		var bufferSize = this.width * this.height;
		
		// create the depth buffer
		this.depthBuffer = new Array(bufferSize);
		
		// create the stencil buffer - NOT YET USED
		this.stencilbuffer = null;
		
		
		this.vertexBuffer = [];
		this.indexBuffer  = [];
		this.shader       = null;
	}
	
	setCullMode(cullMode) {
		this.cullMode = cullMode;
	}
	
	
	clearColorBuffer(clearColor) {
		// set all the color buffer to the specified color
		this.context.fillStyle = clearColor.cssColorRGB();
    	this.context.fillRect(0, 0, this.width, this.height);
    	this.contextData = this.context.getImageData(0, 0, this.width, this.height);
    	this.colorBuffer = this.contextData.data;
	}
	
	
	clearDepthBuffer(value) {
		// fill with depth buffer with the specified value
		this.depthBuffer.fill(value);
	}
	
	clearStencilBuffer(value) {
		// does nothing at the moment
	}
	
	
	draw() {
	
		// create the vertex output for every object in vertex buffer
		var vertexOutput = this.vertexBuffer.map(this.shader.vertex, this.shader);
		
		
		
		// do the 'drawZBuffer' to actually draw them
		var indexbufferLength = this.indexBuffer.length;
		for (var i = 0; i < indexbufferLength; i+=3) { 
		
			var i1 = this.indexBuffer[i+0];
			var i2 = this.indexBuffer[i+1];
			var i3 = this.indexBuffer[i+2];
		
			var o1 = vertexOutput[i1];
 			var o2 = vertexOutput[i2];
 			var o3 = vertexOutput[i3];
		
		
			var input = [o1,o2,o3];
			
			
			// check the winding order of face
			var e1 = vector3Subtract(o2.position, o1.position);
			var e2 = vector3Subtract(o3.position, o1.position);
			var faceNormal = vector3CrossProduct(e1, e2);
		
			// if the face is to be culled, return without drawing
			if (this.cullMode === CULL_MODE_BACK && faceNormal.z < 0) {
				continue;
			}
			// if the face is to be culled, return without drawing
			if (this.cullMode === CULL_MODE_FRONT && faceNormal.z > 0) {
				continue;
			}
			
			if (faceNormal.z == 0) {
				continue;
			}
			
		
			this._renderFace(input);
		}
	}
	
	
	
	
	outputToDisplay() {
		// actually draw the contents of the color buffer to the javascript context
		this.context.putImageData(this.contextData, 0, 0);
	}
	
	
	
	
	/////// PRIVATE METHODS
	
	
	_setPixel(x, y, color) {
		var colorArray = color.colorArray();
		var pixelOffset = ((y * this.width) + x) * 4;
		this.colorBuffer[pixelOffset + 0] = colorArray[0];
		this.colorBuffer[pixelOffset + 1] = colorArray[1];
		this.colorBuffer[pixelOffset + 2] = colorArray[2];
	}



	// @param pixelInputs - The output from each vertex of the face
	_renderFace(pixelInputs) {
	
		
		var hw = this.width  / 2.0;
		var hh = this.height / 2.0;
	
	
		var pts = [];
		for (var i=0, len=pixelInputs.length; i<3; i++) {
			var p = pixelInputs[i].position;
			p = new Vector3(p.x * hw + hw, p.y * hh + hh, p.z);
			pts.push(p);
		}
	
	
		var bboxmin = new Vector2(Number.MAX_VALUE, Number.MAX_VALUE);
		var bboxmax = new Vector2(-Number.MAX_VALUE, -Number.MAX_VALUE);
		var clamp   = new Vector2(this.width-1, this.height-1);
	
		for (var i=0; i<3; i++) {
	
			bboxmin.x = Math.max(0.0,     Math.min(bboxmin.x, pts[i].x));
			bboxmax.x = Math.min(clamp.x, Math.max(bboxmax.x, pts[i].x));
		
			bboxmin.y = Math.max(0.0,     Math.min(bboxmin.y, pts[i].y));
			bboxmax.y = Math.min(clamp.y, Math.max(bboxmax.y, pts[i].y));
		}
	
		var P = new Vector3();
		var xLength = Math.ceil(bboxmax.x);
		var yLength = Math.ceil(bboxmax.y);
		var xFloor = Math.floor(bboxmin.x);
		var yFloor = Math.floor(bboxmin.y);
		for (P.x = xFloor; P.x <= xLength; P.x++) {
			for (P.y = yFloor; P.y <= yLength; P.y++) {
			
				var bc_screen  = barycentric(pts[0], pts[1], pts[2], P);
				
				if (bc_screen.x<0 || bc_screen.y<0 || bc_screen.z<0) continue;
			
				P.z = 0;
				P.z += pts[0].z * bc_screen.x;
				P.z += pts[1].z * bc_screen.y;
				P.z += pts[2].z * bc_screen.z;
			
				let depthBufferIndex = Math.floor(P.x+P.y*this.width);
				if (this.depthBuffer[depthBufferIndex] > P.z) {
					this.depthBuffer[depthBufferIndex] = P.z;
				
					var interpolatedPixelShaderInput = this.shader.interpolate(pixelInputs[0], pixelInputs[1], pixelInputs[2], bc_screen);
				
					var color = this.shader.pixel(interpolatedPixelShaderInput);
					this._setPixel(P.x,this.height-P.y, color);
				}
			}
		}
	}
	
	
}

function barycentric(A, B, C, P) {
	
	var s0 = new Vector3();
	var s1 = new Vector3();

	s1.x = C.y-A.y;
	s1.y = B.y-A.y;
	s1.z = A.y-P.y;
	
	s0.x = C.x-A.x;
	s0.y = B.x-A.x;
	s0.z = A.x-P.x;


	var u = vector3CrossProduct(s0, s1);
		
	return new Vector3(1.0-(u.x+u.y)/u.z, u.y/u.z, u.x/u.z);
}






