

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
		//x1 = x+1;
		//y1 = y+1;
		
		return this.imageData[x + (y*this.width)];
	}
	
// 	getColor(x, y) {		
// 		return this.bilinear(x, y);
// 	}
	
	bilinear(x, y) {
	
	  var x = x * this.width;
	  var y = (1.0-y) * this.height;
	
	  var percentX = x - Math.floor(x);
      var percentY = y - Math.floor(y);
	
	  x = Math.floor(x);
	  y = Math.floor(y);
	  var x1 = x+1;
	  var y1 = y+1;
	
      
      
      var a = this.imageData[x + (y*this.width)];
      var b = this.imageData[x + (y1*this.width)];
      var c = this.imageData[x1 + (y*this.width)];
      var d = this.imageData[x1 + (y1*this.width)];
      
  
      var topR = (b.r * percentX) + (d.r * (1.0 - percentX));
      var bottomR = (a.r * percentX) + (c.r * (1.0 - percentX));
      var finalR = topR * percentY + bottomR * (1.0 - percentY);
  
  	  var topG = (b.g * percentX) + (d.g * (1.0 - percentX));
      var bottomG = (a.g * percentX) + (c.g * (1.0 - percentX));
      var finalG = topG * percentY + bottomG * (1.0 - percentY);
      
      var topB = (b.b * percentX) + (d.b * (1.0 - percentX));
      var bottomB = (a.b * percentX) + (c.b * (1.0 - percentX));
      var finalB = topB * percentY + bottomB * (1.0 - percentY);
  
      return new Color(finalR, finalG, finalB);
  }
}




