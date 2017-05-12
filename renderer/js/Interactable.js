"use strict"
const {THREE} = require('three.js')

function init(var dims, var texmap, var pos){
  var interabox = new THREE.BoxGeometry(dims.x, dims.y, dims.z, 1, 1, 1)
  var intermaterial = new THREE.MeshBasicMaterial(map: texmap)
  var interactable = new THREE.Mesh(iterabox, intermaterial)
  interactable.position.set(pos.x, pos.y, pos.z)

  var shadowGlow = new THREE.ShaderMaterial({
    uniforms:
		{
			"c":   { type: "f", value: 1.0 },
			"p":   { type: "f", value: 6.0 },
			glowColor: { type: "c", value: new THREE.Color(0x020b50) },
			viewVector: { type: "v3", value: camera.position }
		},
		vertexShader:   vertexShader,
		fragmentShader: fragmentShader,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
  })

  var shadowbox = iterabox.clone()
  var modifier = new THREE.SubdivisionModifier( 2 )
	modifier.modify(shadowbox)
  var shadow = new THREE.Mesh(shadowbox, shadowGlow.clone())
  shadow.position = interactable.position
	shadow.scale.multiplyScalar(1.5)
}


lookGlowRatio (var lookAtAngle, var objToPlayerAngle, var threshold){
  var dotProduct = (lookAtAngle.x*objToPlayerAngle.x) + (lookAtAngle.y*objToPlayerAngle.y)
  var angle = Math.abs(Math.acos(dotProduct))
  if(angle <= threshold){
    return angle
  }
  else{
    return null
  }
}
