
class Animator {
	animate(deltaTime) {}
}

class ModelRotateAnimator extends Animator {

	constructor(modelMatrix) {
		super();
		this.modelMatrix = modelMatrix;
	}

	animate(deltaTime) {
		var rotation = matrixRotRollPitchYaw(0.0, 0.02, 0.0);
		this.modelMatrix.multiply(rotation);
	}
}

class ModelTumbleAnimator extends Animator {
	constructor(modelMatrix) {
		super();
		this.modelMatrix = modelMatrix;
	}

	animate(deltaTime) {
		var rotation = matrixRotRollPitchYaw(0.02, 0.02, 0.0);
		this.modelMatrix.multiply(rotation);
	}
}


class CameraOrbitAnimator extends Animator {
	animate(deltaTime) {
		
	}
}