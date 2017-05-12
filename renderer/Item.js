class Item {
    constructor(scene, x, y, z, rx, ry, rz, sx, sy, sz) {
        this.radians = Math.PI/180;
        this.model = this.LoadModel(scene, x, y, z, rx, ry, rz, sx, sy ,sz);
        this.vec = {
            x:Math.cos(ry),
            y:0,
            z:Math.sin(ry)
        };
        this.glow = this.Glow(scene, this.model);
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

    Glow(scene, model){
        //var shadowGlow = new THREE.ShaderMaterial({
        //    uniforms:
        //        {
        //            "c":   { type: "f", value: 1.0 },
        //            "p":   { type: "f", value: 6.0 },
        //            glowColor: { type: "c", value: new THREE.Color(0x020b50) },
        //            viewVector: { type: "v3", value: 0  }
        //        },
        //    vertexShader:   vertexShader,
        //    fragmentShader: fragmentShader,
        //    side: THREE.BackSide,
        //    blending: THREE.AdditiveBlending,
        //    transparent: true
       // };

        //var shadowbox = model.clone();
        //var modifier = new THREE.SubdivisionModifier( 2 );
        //modifier.modify(shadowbox);
        //var shadow = new THREE.Mesh(shadowbox, shadowGlow.clone());
        //shadow.position = model.position;
        //shadow.scale.multiplyScalar(1.5);
        //scene.add(shadow);
        //return shadow;
    }

    GetModel() {
        return this.model;
    }

    GetVector() {
        return this.vec;
    }

    GetPos() {
        let p = {
            x: this.model.position.x,
            y: this.model.position.y,
            z: this.model.position.z
        }
        return {
            position: p
        };
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

    lookGlowRatio ( lookAtAngle,  objToPlayerAngle,  threshold){
        var dotProduct = (lookAtAngle.x*objToPlayerAngle.x) + (lookAtAngle.y*objToPlayerAngle.y);
        var angle = Math.abs(Math.acos(dotProduct));
        if(angle <= threshold){
            if(angle == 0){
                return .6;
            }
            else if(angle <= (threshold/5)){
				return .5;
        }
        else if(angle <= (threshold*(2/5))){
            return .4;
        }
        else if(angle <= (threshold*(3/5))){
            return .3;
        }
        else if(angle <= (threshold*(4/5))){
            return .2;
        }
        else if(angle == threshold){
            return .1;
        }
    }
    return null;
    }
    }

module.exports = {
        Item: Item
    }

