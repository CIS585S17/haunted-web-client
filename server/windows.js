'use strict'

class WindowForms {
  constructor(BrowserWindow, debug, dirname, windows) {
    this.BrowserWindow = BrowserWindow
    this.debug = debug
    this.dirname = dirname
    this.windows = windows
  }

  ingameWindow (index) {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    let i = this.windows.length - 1
    this.windows[i].loadURL(`file://${this.dirname}/public/menu/ingame_menu.html`)
    this.windows[i].once('ready-to-show', () => {
      this.windows[i].show()
    })
    this.windows[i].webContents.on('did-finish-load', () => {
      this.windows[i].webContents.send('load', i)
    })
    if (this.debug) {
      this.windows[i].webContents.openDevTools()
    }

    this.windows[i].on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  optionsWindow (index) {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    let i = this.windows.length - 1
    this.windows[i].loadURL(`file://${this.dirname}/public/options/options.html`)
    this.windows[i].once('ready-to-show', () => {
      this.windows[i].show()
    })
    this.windows[i].webContents.on('did-finish-load', () => {
      this.windows[i].webContents.send('load', i)
    })
    if (this.debug) {
      this.windows[i].webContents.openDevTools()
    }

    this.windows[i].on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  gameWindow () {
    this.windows.push(new this.BrowserWindow({ width: 1800, height: 1000, experimentalCanvasFeatures: true, fullscreen: true }))
    let i = this.windows.length - 1
    this.windows[i].loadURL(`file://${this.dirname}/public/index.html`)
    this.windows[i].webContents.on('did-finish-load', () => {
      this.windows[i].webContents.send('load', i)
    })
    if (this.debug) {
      this.windows[i].webContents.openDevTools()
    }

    this.windows[i].on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  startWindow () {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false}))
    let i = this.windows.length - 1
    this.windows[i].loadURL(`file://${this.dirname}/public/menu/menu.html`)
    this.windows[i].webContents.on('did-finish-load', () => {
      this.windows[i].webContents.send('load', i)
    })
    if (this.debug) {
      this.windows[i].webContents.openDevTools()
    }

    this.windows[i].on('closed', () => {
      this.windows.splice(i, 1)
    })
  }
}

module.exports = {
  WindowForms: WindowForms
}
