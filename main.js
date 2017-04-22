'use strict'
const {app, BrowserWindow, ipcMain} = require('electron')
const {WindowForms, WindowGraph} = require('./main/windows')
// const {Player} = require('./server/player')
// const {Connect} = require('./main/connect')
// let socket = require('socket.io-client')('ws://cslinux.cs.ksu.edu:5444')
let socket = require('socket.io-client')('http://localhost:5333')

let debug = true
let win = []
let windowForm = new WindowForms(BrowserWindow, debug, __dirname, win)
// let windowGraph = new WindowGraph(BrowserWindow, debug, __dirname)
// let player = new Player()

function createWindow () {
  windowForm.startWindow()
  // windowGraph.startWindow()
}

socket.on('start-game', (start) => {
  windowForm.gameWindow()
  for (let i = 0; i < win.length - 1; i++) {
    win[i].close()
  }
})


socket.on('get-games', (games) => {
  windowForm.joinGameWindow({index: 0, games: games})
})
  // connect.getGames((games) => {
  //   windowForm.joinGameWindow({index: index, games: games})
  // })
  // windowForm.gameWindow()
  // win[index].close()

// connect.startGame((start) => {
//   if (start) {
//     windowForm.gameWindow()
//     // for (let i = 1; i < win.length; i++) {
//     //   win[i].close()
//     // }
//     for (let i = 0; i < win.length - 1; i++) {
//       win[i].close()
//     }
//   }
// })


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  createWindow()
})

app.on('browser-window-created', (event, window) => {
  window.setMenu(null)
})

ipcMain.on('options', (event, index) => {
  windowForm.optionsWindow(index)
})

ipcMain.on('host-game', (event, index) => {
  windowForm.hostGameWindow(index)
})

ipcMain.on('host', (event, msg) => {
  // connect.host(msg.name)
  socket.emit('host-game', msg.name)
  win[msg.index.childIndex].close()
  windowForm.gameQueueWindow(msg.index.parentIndex)
})

ipcMain.on('join-game', (event, index) => {
  socket.emit('get', 'get the game')
})

ipcMain.on('join', (event, data) => {
  // connect.join(data.game.id)
  socket.emit('join', data.game.id)
})

ipcMain.on('pause-game', (event, index) => {
  windowForm.ingameWindow(index)
})

ipcMain.on('resume-game', (event, index) => {
  win[index].close()
})

ipcMain.on('quit-to-main-window', (event, index) => {
  windowForm.startWindow()
  for (let i in index) {
    if (index[i] !== 0) {
      win[index[i]].close()
    }
  }
})

ipcMain.on('quit-game', (event) => {
  for (let w of win) {
    w.close()
  }
})
