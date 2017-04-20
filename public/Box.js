//Box width = .6, width/2 = .3;
//Box height = 1.5, height/2 = .75;
//Box depth = .6, depth/2 = .3



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
