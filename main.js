'use strict'
const {app, BrowserWindow, ipcMain} = require('electron')
const {WindowForms} = require('./main/windows')
// const {Player} = require('./server/player')
const io = require('socket.io-client')
let socket = io('cislinux.cs.ksu.edu:5000')

let debug = true
let win = []
let windowForm = new WindowForms(BrowserWindow, debug, __dirname, win)
// let player = new Player()

function createWindow () {
  windowForm.startWindow()
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
  // socket.emit('host', msg)

  console.log(socket)
  // let s = socket.io.open()
  // console.log(s)
  // s.on('join', (data) => {
  //   console.log(data)
  // })
  // socket.on('connection', (error, data) => {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log(data)
  //     console.log(msg)
  //   }
  // })
  // socket.io.connect((err, data) => {
  //   if (err) {
  //     console.log(err)
  //   }
  //   console.log('data', data)
  // })
  // console.log(socket)
  // socket.io.on('connect', () => {
  //   console.log(socket.id)
  // })
  // let connect = socket.connect('/')
  // console.log(msg)
  // io.emit('host', msg)
  // io.on('join', (m) => {
  //   console.log(m)
  // })
  // let connect = io.connect('/')
  // connect.emit('host', msg)
  // connect.on('join', (m) => {
  //   console.log(m)
  // })
  // console.log(socket)
  // socket.on('connection')
//   io.on('connection', (err, socket) => {
//     if (err) {
//       console.log(err)
//     }
//     socket.on('join', (m) => {
//       console.log(m)
//     })
//     socket.emit('host', msg)
//   })
})

ipcMain.on('join-game', (event, index) => {
  // windowForm.joinGameWindow(index)
  windowForm.gameWindow()
  win[index].close()
})

ipcMain.on('join', (event, data) => {

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
