

// function Vector2(x,y) {
// 	this.init(x,y);
// }

class Texture {
	constructor(image) {
		this.image = image;
		this.width = image.width;
		this.height = image.height;
		
		var canvas = document.createElement('canvas');
		canvas.width = image.width;
		canvas.height = image.height;
		canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
		var canvas = canvas;
		var context = canvas.getContext('2d');
		
		var contextData = context.getImageData(0, 0, canvas.width, canvas.height);
    	var colorBuffer = contextData.data;
    	
    	
    	this.imageData = [];
    	
    	for (var i = 0, len = colorBuffer.length; i < len; i+=4) {
			var pixelDataR = colorBuffer[i + 0];
			var pixelDataG = colorBuffer[i + 1];
			var pixelDataB = colorBuffer[i + 2];
			var color = new Color(pixelDataR/255.0, pixelDataG/255.0, pixelDataB/255.0);
			this.imageData.push(color);
		}
    	
	}
	
	
	getColor(x, y) {
	
		var x = x * this.width;
		var y = (1.0-y) * this.height;
	
		x = Math.floor(x);
		y = Math.floor(y);
		
		return this.imageData[x + (y*this.width)];
	
// 		var pixelDataR = this.colorBuffer[((x + (y*this.canvas.width)) * 4)+0];
// 		var pixelDataG = this.colorBuffer[((x + (y*this.canvas.width)) * 4)+1];
// 		var pixelDataB = this.colorBuffer[((x + (y*this.canvas.width)) * 4)+2];
// 		var color = new Color(pixelDataR/255.0, pixelDataG/255.0, pixelDataB/255.0);
// 		return color;
	}
}




