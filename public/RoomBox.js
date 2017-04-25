class RoomBox {
	constructor(scene, x, y, z, xScale, yScale, zScale) {
		this.xBottom =  x - xScale/2,
		this.xTop = x + xScale/2,
		this.yBottom = y - yScale/2,
		this.yTop = y + yScale/2,
		this.zBottom = z - zScale/2,
		this.zTop = z + zScale/2
		this.model = this.addCollisionBox(scene, x, y, z, xScale, yScale, zScale)
	}

	addCollisionBox(scene, x, y, z, xs, ys, zs) {
		var geometry = new THREE.BoxGeometry(xs, ys, zs);
		var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
		var box = new THREE.Mesh(geometry, material);
		box.position.set(x, y, z);
		scene.add(box);
		return box;
	}

	GetModel() {
	  return this.model;
	}

	GetCollisionModel() {
		return {
			minX: this.xBottom,
			maxX: this.xTop,
			minY: this.yBottom,
			maxY: this.yTop,
			minZ: this.zBottom,
			maxZ: this.zTop
		};
	}
}

module.exports = {
	RoomBox: RoomBox
}
