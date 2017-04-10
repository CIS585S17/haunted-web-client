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
    let ingameWin = this.windows[i]
    ingameWin.loadURL(`file://${this.dirname}/public/menu/ingame_menu.html`)
    ingameWin.once('ready-to-show', () => {
      ingameWin.show()
    })
    ingameWin.webContents.on('did-finish-load', () => {
      ingameWin.webContents.send('load', {parentIndex: index, childIndex: i})
    })
    if (this.debug) {
      ingameWin.webContents.openDevTools()
    }

    ingameWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  optionsWindow (index) {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    let i = this.windows.length - 1
    let optionsWin = this.windows[i]
    optionsWin.loadURL(`file://${this.dirname}/public/options/options.html`)
    optionsWin.once('ready-to-show', () => {
      optionsWin.show()
    })
    optionsWin.webContents.on('did-finish-load', () => {
      optionsWin.webContents.send('load', i)
    })
    if (this.debug) {
      optionsWin.webContents.openDevTools()
    }

    optionsWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  gameWindow () {
    this.windows.push(new this.BrowserWindow({ width: 1800, height: 1000, experimentalCanvasFeatures: true, fullscreen: true }))
    let i = this.windows.length - 1
    let gameWin = this.windows[i]
    gameWin.loadURL(`file://${this.dirname}/public/index.html`)
    gameWin.webContents.on('did-finish-load', () => {
      gameWin.webContents.send('load', i)
    })
    if (this.debug) {
      gameWin.webContents.openDevTools()
    }

    gameWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  startWindow () {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false}))
    let i = this.windows.length - 1
    let startWin = this.windows[i]
    startWin.loadURL(`file://${this.dirname}/public/menu/menu.html`)
    startWin.webContents.on('did-finish-load', () => {
      startWin.webContents.send('load', i)
    })
    if (this.debug) {
      startWin.webContents.openDevTools()
    }

    startWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }
}

module.exports = {
  WindowForms: WindowForms
}
