"use strict";

var chatMessageDiv = document.getElementById("chatMessageDiv");

function HUD ()
{
    this.active = false;
}

HUD.prototype.update = function (active)
{
    // No point in setting things again if active is the same value it was in the previous update
    if (active != this.active) {
        this.active = active;

        if (this.active) {
            chatMessageDiv.style.visibility = "visible";
            document.exitPointerLock();
        }
        else {
            chatMessageDiv.style.visibility = "hidden";
            document.body.requestPointerLock();
        }
    }

    chatMessageDiv.style.opacity = document.activeElement == chatMessageDiv ? 1.0 : 0.6;
}