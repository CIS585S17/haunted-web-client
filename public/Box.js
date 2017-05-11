class Box {
	constructor(scene, x, y, z) {
		this.position = {
			x:0,
			y:0,
			z:0
		}
		this.velocity = {
			x:0,
			y:0,
			z:0
		}
		this.acceleration = {
			x:0,
			y:-0.0075,
			z:0
		}
		this.radians = Math.PI/180;
		this.speed = 0.025;
		//this.model = this.LoadModel(scene, x, y, z);
		this.model = this.LoadModel(scene, x, y, z);
		this.vec = {
			x:0,
			y:0,
			z:0
		}
	}

	LoadModel(scene, x, y, z) {
		var geometry = new THREE.BoxGeometry(.6, 1.5, .6);
			for ( var i = 0; i < geometry.faces.length; i ++ ) {
    		geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
			}
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } )
		var box = new THREE.Mesh(geometry, material);
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
		box.position.set(x, y, z);
		scene.add(box);
		return box;
	}

	GetModel() {
	  return this.model;
	}

	GetVector() {
		this.vec.x = Math.cos(this.model.rotation.y);
		this.vec.y = 0;
		this.vec.z = Math.sin(this.model.rotation.y);
		return this.vec;
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
		this.velocity.x = Math.cos((rotationY*this.radians)) * this.speed;
	  this.velocity.z = Math.sin((rotationY*this.radians)) * this.speed;
	  this.model.position.x += Math.cos((rotationY*this.radians)) * this.speed;
	  this.model.position.z += Math.sin((rotationY*this.radians)) * this.speed;
	}

	MoveDown(rotationY) {
	  this.velocity.x = -Math.cos((rotationY*this.radians)) * this.speed;
	  this.velocity.z = -Math.sin((rotationY*this.radians)) * this.speed;
		this.model.position.x -= Math.cos((rotationY*this.radians)) * this.speed;
	  this.model.position.z -= Math.sin((rotationY*this.radians)) * this.speed;
	}

	MoveRight(rotationY) {
		this.velocity.x = Math.cos((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.velocity.z = Math.sin((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.model.position.x += Math.cos((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.model.position.z += Math.sin((rotationY*this.radians) + Math.PI / 2) * this.speed;
	}

	MoveLeft(rotationY) {
		this.velocity.x = -Math.cos((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.velocity.z = -Math.sin((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.model.position.x -= Math.cos((rotationY*this.radians) + Math.PI / 2) * this.speed;
	  this.model.position.z -= Math.sin((rotationY*this.radians) + Math.PI / 2) * this.speed;
	}

	Jump() {
		//console.log('jump');
		if(this.position.y<=0.75) {
			//console.log('vel y:' + this.velocity.y + ' 0.75');
			//console.log('jumping');
			this.velocity.y+=0.15;
		}
	}

	NoMoveXZ() {
		this.velocity.x = 0;
		this.velocity.z = 0;
	}

	Rotate(rotationY) {
	  this.model.rotation.y = -rotationY*Math.PI/180;
	}

	Update() {
		this.velocity.x += this.acceleration.x;
		this.velocity.y += this.acceleration.y;
		this.velocity.z += this.acceleration.z;
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
		if(this.position.y <= 0.75) {
			this.velocity.y = this.acceleration.y;
			this.position.y = 0.75;
		}
		this.position.z += this.velocity.z;
		this.model.position.x = this.position.x;
		this.model.position.y = this.position.y;
		this.model.position.z = this.position.z;
	}
}

module.exports = {
	Box: Box
}
