// JavaScript source code
class Player
{  
    constructor(position, model)
    {
        this.position = position;
        this.model = model;
        var items;

    }

    Update() 
    {
        if (movementInput.left) {
            position.x -= Math.cos(rotationX + Math.PI / 2) * speed
            position.z -= Math.sin(rotationX + Math.PI / 2) * speed
        }
        if (movementInput.right) {
            position.x += Math.cos(rotationX + Math.PI / 2) * speed
            position.z += Math.sin(rotationX + Math.PI / 2) * speed
        }
        if (movementInput.up) {
            position.x += Math.cos(rotationX) * speed
            position.z += Math.sin(rotationX) * speed
        }
        if (movementInput.down) {
            position.x -= Math.cos(rotationX) * speed
            position.z -= Math.sin(rotationX) * speed
        }
    }
}