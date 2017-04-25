class Box {
	constructor(scene, x, y, z) {
		this.radians = Math.PI/180;
		this.speed = 0.025;
		this.model = this.LoadModel(scene, x, y, z);
	}

	LoadModel(scene, x, y, z) {
		var geometry = new THREE.BoxGeometry(.6, 1.5, .6, 3, 3, 3);
		var material = new THREE.MeshBasicMaterial({color: 0xfffff, wireframe: true});
		var box = new THREE.Mesh(geometry, material);
		box.position.set(x, y, z);
		scene.add(box);
		console.log('added box');
		return box;
	}

	GetModel() {
	  return this.model;
	}

	GetCollisionModel() {
		let modelWidth = 0.6;
		let modelHeight = 1.5;
		let modelDepth = 0.6;
		let min_X = this.model.position.x - modelWidth/2;
		let max_X = this.model.position.x + modelWidth/2;
		let min_Y = this.model.position.y - modelHeight/2;
		let max_Y = this.model.position.y + modelHeight/2;
		let min_Z = this.model.position.z - modelDepth/2;
		let max_Z = this.model.position.z + modelDepth/2;
		return{	minX: min_X, maxX: max_X,
					 	minY: min_Y, maxY: max_Y,
						minZ: min_Z, maxZ: max_Z };

	}

	MoveUp(rotationY) {
	  this.model.position.x += Math.cos((rotationY*this.radians)) * this.speed;
	  this.model.position.z += Math.sin((rotationY*this.radians)) * this.speed;
	}

	MoveDown(rotationY) {
	  this.model.position.x -= Math.cos((rotationY*this.radians)) * this.speed;
	  this.model.position.z -= Math.sin((rotationY*this.radians)) * this.speed;
	}

	MoveRight(rotationY) {
	  this.model.position.x += Math.cos((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.model.position.z += Math.sin((rotationY*this.radians) + Math.PI / 2) * this.speed;
	}

	MoveLeft(rotationY) {
	  this.model.position.x -= Math.cos((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.model.position.z -= Math.sin((rotationY*this.radians) + Math.PI / 2) * this.speed;
	}

	Rotate(rotationY) {
	  this.model.rotation.y = -rotationY*Math.PI/180;
	}
}

module.exports = {
	Box: Box
}
