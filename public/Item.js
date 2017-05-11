class Item {
	constructor(scene, x, y, z, rx, ry, rz, sx, sy, sz) {
		this.radians = Math.PI/180;
		this.model = this.LoadModel(scene, x, y, z, rx, ry, rz, sx, sy ,sz);
		this.vec = {
			x:Math.cos(ry),
			y:0,
			z:Math.sin(ry)
		};
	}

	LoadModel(scene, x, y, z, rx, ry, rz, sx, sy, sz) {
		var geometry = new THREE.BoxGeometry(sx, sy, sz);
			for ( var i = 0; i < geometry.faces.length; i ++ ) {
    		geometry.faces[ i ].color.setHex( Math.random() * 0xffffff );
			}
		var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors } )
		var box = new THREE.Mesh(geometry, material);
		box.position.set(x, y, z);
		box.rotation.set(rx, ry, rz);
		scene.add(box);
		return box;
	}

	GetModel() {
	  return this.model;
	}

	GetVector() {
		return this.vec;
	}

	GetCollisionModel() {
		let modelWidth = 0.25;
		let modelHeight = 0.25;
		let modelDepth = 0.25;
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
}

module.exports = {
	Item: Item
}
