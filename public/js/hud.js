"use strict";

var chatTextArea = document.getElementById("chatTextArea");
var chatLogDiv = document.getElementById("chatLogDiv");

var chatLog = [];

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
            chatTextArea.style.visibility = "visible";
            chatLogDiv.style.opacity = 0.9;
            document.exitPointerLock();
        }
        else {
            chatTextArea.style.visibility = "hidden";
            chatLogDiv.style.opacity = 0.7;
            document.body.requestPointerLock();
        }
    }

    chatTextArea.style.opacity = document.activeElement == chatTextArea ? 1.0 : 0.9;
}

HUD.prototype.addChatMsg = function (msg)
{
    var chatDepth = 10;

    if (chatLog.length == 10) {
        chatLog.shift();
    }

    chatLog.push(msg);
    chatDepth = 10 - chatLog.length;
    chatLogDiv.innerHTML = "";

    while (chatDepth != 0) {
        chatLogDiv.innerHTML += ("<br>");
        chatDepth--;
    }
    chatLog.forEach(function (m) {
        chatLogDiv.innerHTML += ("<br>" + m);
    });
}
