# Haunted-Web-Client
A cross-platform Engine and Multiplayer Game run on Electron

## Installation
```$ npm install```
Once installed
```$ npm start``` to play the game.

## Requirements
1. [haunted-server](https://github.com/CIS585S17/haunted-server/tree/v1.0) currently running on Heroku

## Debug
You can turn dev-tools on and off on all windows by going into main.js and turning debug to false for off and true for on.

## Playing
Once you have the game running the main menu will appear. Choose host game to name a game and start a game.
A second player can start a new game and choose to join by picking from a list of available games. Once all players
have chosen their character, the game will start.

## Controls
1. Tab to pause and see ingame window once game has started.
2. W, S, A, D to move character around room
3. Space to jump

## Known Bugs
1. Once player leaves the game they have to shut down the game by exiting all windows and restarting to reconnect to the server. The game does not crash, but it returns
   a empty character list when on the game-queue window. The problem is the player is still part of the socket.io room and they need to be removed so they can be added to a new game instance.
   Currently still working on how to do this using socket.io, know it can be done just not implemented yet.
2. Resume game button ends the game. Noticed it would end game on one computer but not on second players computer. 

## Future Work
1. Allow player to move to multiple rooms
2. Remove player from socket.io room on server so they can host/join a new game.
3. Turn into a downloadable executable game using Electron build tools

## Credit
1. Spring 2017 CIS585 class
