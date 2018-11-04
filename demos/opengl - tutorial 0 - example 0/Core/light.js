
// function Color(r, g, b) {
// 	this.init(r,g,b);
// }

class Color {
	constructor(r, g, b) {
		this.r = r ? r : 0.0;
		this.g = g ? g : 0.0;
		this.b = b ? b : 0.0;
		this._cssColor = null;
		this._colorArray = null;
	}
	
	cssColorRGB() {
		if (this._cssColor == null) {
 			this._cssColor = "rgb(" + parseInt(this.r*255) + ", " + parseInt(this.g*255) + ", " + parseInt(this.b*255) + ")";
 		}
 		return this._cssColor;
	}
	
	cssColorHex() {
		
	}
	
	colorArray() {
	if (this._colorArray == null) {
		this._colorArray = [ parseInt(this.r*255), parseInt(this.g*255), parseInt(this.b*255), 255 ];
		}
		return this._colorArray;
	}
}


function colorIntensify(color, intensity) {
	return new Color(color.r*intensity, color.g*intensity, color.b*intensity);
}


function colorFromHex(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(result[1], 16) / 255.0;
    var g = parseInt(result[2], 16) / 255.0;
    var b = parseInt(result[3], 16) / 255.0;
    return new Color(r, g, b);
}



// function Light(color, position, intensity) {
// 	this.init(color, position, intensity);
// }
class Light {
    constructor(color, position, intensity) {
        this.color     = color     ? color     : new Color(1.0,1.0,1.0);
        this.position  = position  ? position  : new Vector3(0.0,0.0,0.0);
        this.intensity = intensity ? intensity : 1.0;
    }
}
