
earthTexImage = new Image();
earthTexImage.src = 'Textures/Earth_Texture.jpg';
//earthTex = new Texture(earthTexImage);


moonTextureImage = new Image();
moonTextureImage.src = 'Textures/Moon_Texture.jpg';

moonBumpmapTextureImage = new Image();
moonBumpmapTextureImage.src = 'Textures/Moon_Bumpmap.jpg';



headTexImage = new Image();
headTexImage.src  = 'Textures/african_head_diffuse.jpg';
//headTex = new Texture(headTexImage);


earthLoader = new MeshLoader();
xhrEarth = new XMLHttpRequest();
xhrEarth.open("GET", 'Meshes/sphere.obj');
xhrEarth.onload = function() {
	earthLoader.makeMesh(this.responseText);
};
xhrEarth.send(null);


manLoader = new MeshLoader();
xhr2 = new XMLHttpRequest();
xhr2.open("GET", 'Meshes/LEGO_Man.obj');
xhr2.onload = function() {
	manLoader.makeMesh(this.responseText);
	manLoader.finalMesh().calculateNormals();
};
xhr2.send(null);


headerLoader = new MeshLoader();
xhr3 = new XMLHttpRequest();
xhr3.open("GET", 'Meshes/african_head.obj');
xhr3.onload = function() {
	headerLoader.makeMesh(this.responseText);
};
xhr3.send(null);



const TEAPOT    = 'teapot';
const HEAD      = 'head';
const EARTH     = 'earth';
const LEGOMAN   = 'legoman';

function demoForIndex(option, renderingContext) {

	switch (option) {
		case TEAPOT:
			return makeTeapotDemo();
			break;
		case HEAD:
			return makeHeadDemo();
			break;
		case EARTH:
			return makeEarthDemo();
			break;
		case LEGOMAN:
			return makeLegomanDemo();
			break;
	}

}


function makeTeapotDemo() {
	var mesh   = makeTeapot();
	var lightDirection = new Vector3(1.0, 1.0, 1.0);
	var color = new Color(1, 0, 0);
	var shader = new ToonShader(lightDirection, color);
	return { mesh: mesh, shader: shader, culling: CULL_MODE_BACK };
}

function makeHeadDemo() {
	var mesh   = headerLoader.finalMesh();
	var texture = new Texture(headTexImage);
	var shader = new TextureShader(texture);
	return { mesh: mesh, shader: shader, culling: CULL_MODE_NONE };
}

function makeEarthDemo() {
	var mesh   = earthLoader.finalMesh();
	var texture = new Texture(moonTextureImage);
	var bumpMapTex = new Texture(moonBumpmapTextureImage);
	var shader = new TextureWithNormalMapShader(texture, bumpMapTex);
	return { mesh: mesh, shader: shader, culling: CULL_MODE_BACK };
}

function makeLegomanDemo() {
	var mesh   = manLoader.finalMesh();
	var lightDirection = new Vector3(1.0, 1.0, 1.0);
	var color = new Color(1, 0.89, 0.188);
	var shader = new GouraudShader(lightDirection, color);
	return { mesh: mesh, shader: shader, culling: CULL_MODE_BACK };
}