'use strict'
const {app, BrowserWindow, ipcMain} = require('electron')

let debug = true
let win = []
let gameWin

function createWindow () {
  // win = new BrowserWindow({ width: 1800, height: 1000, frame:false, transparent: true, experimentalCanvasFeatures: true })
  win.push(new BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false}))
  let index = win.length - 1
  win[index].loadURL(`file://${__dirname}/public/menu/menu.html`)
  // startWin = new BrowserWindow({fullscreen: true})
  // startWin.loadURL(`file://${__dirname}/public/menu/menu.html`)
  win[index].webContents.on('did-finish-load', () => {
    win[index].webContents.send('load', index)
  })
  if (debug) {
    win[index].webContents.openDevTools()
    // startWin.webContents.openDevTools()
  }
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

ipcMain.on('options', (event) => {

})

ipcMain.on('host-game', (evnet) => {

})

ipcMain.on('join-game', (event, index) => {
  gameWin = new BrowserWindow({ width: 1800, height: 1000, experimentalCanvasFeatures: true, fullscreen: true })
  gameWin.loadURL(`file://${__dirname}/public/index.html`)
  if (debug) {
    gameWin.webContents.openDevTools()
  }
  win[index].close()
})

ipcMain.on('quit-game', (event) => {
  for (let w of win) {
    w.close()
  }
})
