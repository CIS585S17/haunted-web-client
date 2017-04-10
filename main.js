'use strict'
const {app, BrowserWindow, ipcMain} = require('electron')
const {WindowForms} = require('./server/windows')

let debug = true
let win = []
let windowFrom = new WindowForms(BrowserWindow, debug, __dirname, win)

function createWindow () {
  windowFrom.startWindow()
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
  windowFrom.optionsWindow(index)
})

ipcMain.on('host-game', (evnet) => {

})

ipcMain.on('join-game', (event, index) => {
  windowFrom.gameWindow()
  win[index].close()
})

ipcMain.on('pause-game', (event, index) => {
  windowFrom.ingameWindow(index)
})

ipcMain.on('resume-game', (event, index) => {
  win[index].close()
})

ipcMain.on('quit-game', (event) => {
  for (let w of win) {
    w.close()
  }
})
