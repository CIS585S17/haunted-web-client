'use strict'
const {app, BrowserWindow, ipcMain} = require('electron')

let debug = false
let win

function createWindow () {
  // win = new BrowserWindow({ width: 1800, height: 1000, frame:false, transparent: true, experimentalCanvasFeatures: true })
  win = new BrowserWindow({ width: 1800, height: 1000, experimentalCanvasFeatures: true })
  win.loadURL(`file://${__dirname}/public/index.html`)
  if (debug) {
    win.webContents.openDevTools()
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// app.on('ready', () => {

// });

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
  if (windows.length == 0) {
    createWindow()
  }
})

app.on('browser-window-created', (event, window) => {
  window.setMenu(null)
})