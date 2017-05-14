'use strict'
const {app, BrowserWindow, ipcMain} = require('electron')
const {Game} = require('./main/game')
const {Player} = require('./main/player')
const {WindowGraph} = require('./main/windows')
const socket = require('socket.io-client')('https://haunted-server.herokuapp.com')
// const socket = require('socket.io-client')('http://localhost:5000')

let debug = true
let game = new Game()
let windowGraph = new WindowGraph(BrowserWindow, debug, __dirname)
let queueWindow

/**
 * Function that opens the main menu window
 */
function createWindow () {
  windowGraph.startWindow()
}

/**
 * Loads the game queue window after emiting and getting
 * a callback of the avaiable players.
 * @param {integer} id The id of the current window
 */
function loadGameQueueWindow (id) {
  socket.emit('get-characters', (characters) => {
    // game.availableCharacters = characters
    let mainWin = windowGraph.windows[0]
    queueWindow = windowGraph.gameQueueWindow(mainWin, {
      parentWinId: mainWin.id,
      characters: characters
    })
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    if (game.gameId) {
      socket.emit('leave-game', (game.gameId, game.player.id))
    }
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  createWindow()
})

/**
 * Sets Electron's default menu to null
 */
app.on('browser-window-created', (event, window) => {
  window.setMenu(null)
})

/**
 * Begining of Socket Events
 * Events should be listed in alphabetical order
 */

/**
 * Socket event to handle incoming message to get the available
 * characters for the selected game instance.
 * @param {array} characters Array of characters that are available to use.
 */
socket.on('available-characters', (characters) => {
  game.availableCharacters = characters
  // loadGameQueueWindow()
})

/**
 * Socket event to handle incoming message to get the available
 * games from the server and display them in a new window
 */
socket.on('get-games', (games) => {
  // let win = windowGraph.windows.find((element) => {
  //   return element.id === 0
  // })
  let win = windowGraph.windows[0]
  windowGraph.joinGameWindow(win, {parentWinId: win.id, games: games})
})

socket.on('selected-characters', (characters) => {
  if (queueWindow) {
    queueWindow.window.webContents.send('selected-characters', {characters: characters})
  }
})

/**
 * Socket event to handle incoming message from the server
 * to start the game one all players have filled up the game queue
 */
socket.on('start-game', (start) => {
  windowGraph.gameWindow()
  for (let i = 0; i < windowGraph.windows.length - 1; i++) {
    windowGraph.windows[i].window.close()
  }
})

/**
 * Socket event to handle incoming message from the server
 * to update the chat log
 */
socket.on('updateChatLog', (msg) => {
  game.chatLog = msg
})

/**
 * End of Socket Events and Begining of Main Events
 * Main Events should be listed in alphabetical order
 */

/**
 * Event that creates a window displaying a message
 * telling the player to wait for another player to join
 * the game. Also closes previous modal window
 */
ipcMain.on('host', (event, msg) => {
  socket.emit('host-game', msg.name, (error, playerID) => {
    if (error) {
      event.sender.send('error', error)
    } else {
      // let mainWin = windowGraph.windows.find((element) => {
      //   return element.id === 0
      // })
      game.addPlayer(new Player(playerID))
      let hostWin = windowGraph.windows.find((element) => {
        return element.id === msg.id
      })
      hostWin.window.close()
      loadGameQueueWindow()
    }
  })
})

/**
 * Event to create a window that allows the player to
 * create a new game
 */
ipcMain.on('host-game', (event, id) => {
  let win = windowGraph.windows.find((element) => {
    return element.id === id
  })
  windowGraph.hostGameWindow(win, {parentWinId: win})
})

/**
 * Event that emits a Socket message telling the server
 * which game instance you want to join
 */
ipcMain.on('join', (event, data) => {
  socket.emit('join', data.game.id, (playerID) => {
    game.gameId = data.game.id
    game.addPlayer(new Player(playerID))
    let joinWin = windowGraph.windows.find((element) => {
      return element.id === data.id
    })
    joinWin.window.close()
    loadGameQueueWindow()
  })
})

/**
 * Event that emits a Socket message to the server to get
 * the available games to join
 */
ipcMain.on('join-game', (event, index) => {
  socket.emit('get', 'get the game')
})

/**
 * Event that emits a Socket message informing the server of a player
 * collision with a door.
 */
ipcMain.on('door-collision', (event, direction) => {
  console.log('before socket emit')
  socket.emit('room-request', direction, (room) => {
    console.log('before event sender')
    event.sender.send('the-room', room)
  })
})

/**
 * Event to create the options menu
 */
ipcMain.on('options', (event, index) => {
  // let win = windowGraph.windows.find((element) => {
  //   return element.id === 0
  // })
  let win = windowGraph.windows[0]
  windowGraph.optionsWindow(win, {parentWinId: win.id})
})

/**
 * Event that opens up a modal menu window.
 * Called from the index/game window.
 * Activated when player pauses the game
 * Send message back telling game window to unpause
 * the game when paused variable is set to false
 * from resume-game Event.
 */
ipcMain.on('pause-game', (event, id) => {
  game.paused = true
  let win = windowGraph.windows.find((element) => {
    return element.id === id
  })
  windowGraph.ingameWindow(win, {parentWinId: id})
  if (!game.paused) {
    event.sender.send('un-pause', game.paused)
  }
})

/**
 * Event that closes all windows in the windows array in the WindowGraph
 * class.
 */
ipcMain.on('quit-game', (event) => {
  for (let win of windowGraph.windows) {
    win.window.close()
  }
})

/**
 * Event that closes all windows and reopens the main menu
 * window.
 */
ipcMain.on('quit-to-main-window', (event, data) => {
  socket.emit('leave-game', (game.gameId, game.player.id))
  windowGraph.startWindow()
  for (let i = 0; i < windowGraph.windows.length - 1; i++) {
    windowGraph.windows[i].window.close()
  }
})

/**
 * Event that closes modal menu window and resumes the
 * game
 * @param {integer} id The id number of the window to close
 */
ipcMain.on('resume-game', (event, id) => {
  game.paused = false
  windowGraph.windows.find((element) => {
    return element.id === id
  }).window.close()
})

ipcMain.on('select-character', (event, charID) => {
  // socket.emit('select-character', charID)
  socket.emit('select-character', charID, (characters, selectedCharacter) => {
    event.sender.send('selected-characters', {
      characters: characters,
      selectedCharacter: selectedCharacter
    })
  })
})

ipcMain.on('start', (event) => {
  socket.emit('start', game.gameId)
})

/**
 * Event to send the updated chat log from the server
 * to the Renderer at index.
 */
ipcMain.on('update-chat-log', (event) => {
  event.returnValue = game.chatLog
  // event.sender.send('updated-chat-log', chatLog)
})
