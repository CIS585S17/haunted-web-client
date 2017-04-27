'use strict'

class GameWindow {
  constructor (id, debug, dirname, file, modal, options, window) {
    this.id = id
    this.debug = debug
    this.dirname = dirname
    this.file = file
    this.modal = modal
    this.options = options
    this.window = window
    this.loadWindow()
  }

  loadWindow () {
    this.window.loadURL(`file://${this.dirname}/renderer/${this.file}`)
    this.window.webContents.on('did-finish-load', () => {
      this.window.webContents.send('load', {
        options: this.options,
        id: this.id
      })
    })
    if (this.debug) {
      this.window.webContents.openDevTools()
    }
    if (this.modal) {
      this.show()
    }
  }

  show () {
    this.window.once('ready-to-show', () => {
      this.window.show()
    })
  }
}

class WindowGraph {
  /**
   * Creates an instance of WindowForms.
   * @param {object} BrowserWindow
   * @param {boolean} debug
   * @param {string} dirname Path
   * @param {array} windows Stores open windows
   *
   * @memberOf WindowForms
   */
  constructor (BrowserWindow, debug, dirname) {
    this.BrowserWindow = BrowserWindow
    this.debug = debug
    this.dirname = dirname
    this.windows = []
  }

  gameQueueWindow (parentWin, options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'game_queue/game_queue.html',
      true,
      options,
      new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: parentWin.window, modal: true, show: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }

  hostGameWindow (parentWin, options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'host/host.html',
      true,
      options,
      new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: parentWin.window, modal: true, show: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }

  /**
   * Creates in game menu modal window
   *
   * @param {integer} index Position of the parent BrowserWindow in windows array
   *
   * @memberOf WindowForms
   */
  ingameWindow (parentWin, options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'menu/ingame_menu.html',
      true,
      options,
      new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: parentWin.window, modal: true, show: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }

  joinGameWindow (parentWin, options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'join/join.html',
      true,
      options,
      new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: parentWin.window, modal: true, show: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }

  /**
   * Creates options modal window.
   *
   * @param {integer} index Position of the parent BrowserWindow in windows array
   *
   * @memberOf WindowForms
   */
  optionsWindow (parentWin, options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'options/options.html',
      true,
      options,
      new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: parentWin.window, modal: true, show: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }

  /**
   * Creates the main game window
   *
   *
   * @memberOf WindowForms
   */
  gameWindow (options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'index.html',
      false,
      options,
      new this.BrowserWindow({ width: 1800, height: 1000, experimentalCanvasFeatures: true, fullscreen: true })
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }

  startWindow (options) {
    this.windows.push(new GameWindow(
      this.windows.length,
      this.debug,
      this.dirname,
      'menu/menu.html',
      false,
      options,
      new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
  }
}

/**
 * A class to create windows for the game
 *
 * @class WindowForms
 */
class WindowForms {
  /**
   * Creates an instance of WindowForms.
   * @param {object} BrowserWindow
   * @param {boolean} debug
   * @param {string} dirname Path
   * @param {array} windows Stores open windows
   *
   * @memberOf WindowForms
   */
  constructor (BrowserWindow, debug, dirname, windows) {
    this.BrowserWindow = BrowserWindow
    this.debug = debug
    this.dirname = dirname
    this.windows = windows
  }

  gameQueueWindow (index) {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    let i = this.windows.length - 1
    let win = this.windows[i]
    win.loadURL(`file://${this.dirname}/public/game_queue/game_queue.html`)
    win.once('ready-to-show', () => {
      win.show()
    })
    win.webContents.on('did-finish-load', () => {
      win.webContents.send('load', {
        index: {parentIndex: index, childIndex: i}
      })
    })
    if (this.debug) {
      win.webContents.openDevTools()
    }

    win.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  hostGameWindow (index) {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    let i = this.windows.length - 1
    let hostGameWin = this.windows[i]
    hostGameWin.loadURL(`file://${this.dirname}/public/host/host.html`)
    hostGameWin.once('ready-to-show', () => {
      hostGameWin.show()
    })
    hostGameWin.webContents.on('did-finish-load', () => {
      hostGameWin.webContents.send('load', {
        index: {parentIndex: index, childIndex: i}
      })
    })
    if (this.debug) {
      hostGameWin.webContents.openDevTools()
    }

    hostGameWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  /**
   * Creates in game menu modal window
   *
   * @param {integer} index Position of the parent BrowserWindow in windows array
   *
   * @memberOf WindowForms
   */
  ingameWindow (index) {
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    let i = this.windows.length - 1
    let ingameWin = this.windows[i]
    ingameWin.loadURL(`file://${this.dirname}/public/menu/ingame_menu.html`)
    ingameWin.once('ready-to-show', () => {
      ingameWin.show()
    })
    ingameWin.webContents.on('did-finish-load', () => {
      ingameWin.webContents.send('load', {
        index: {parentIndex: index, childIndex: i}
      })
    })
    if (this.debug) {
      ingameWin.webContents.openDevTools()
    }

    ingameWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  joinGameWindow (data) {
    console.log(data)
    this.windows.push(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false, parent: this.windows[data.index], modal: true, show: false}))
    let i = this.windows.length - 1
    let joinWin = this.windows[i]
    joinWin.loadURL(`file://${this.dirname}/public/join/join.html`)
    joinWin.once('ready-to-show', () => {
      joinWin.show()
    })
    joinWin.webContents.on('did-finish-load', () => {
      joinWin.webContents.send('load', {
        index: {parentIndex: data.index, childIndex: i},
        games: data.games
      })
    })
    if (this.debug) {
      joinWin.webContents.openDevTools()
    }

    joinWin.on('closed', () => {
      this.windows.splice(i, 1)
    })
  }

  /**
   * Creates options modal window.
   *
   * @param {integer} index Position of the parent BrowserWindow in windows array
   *
   * @memberOf WindowForms
   */
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

  /**
   * Creates the main game window
   *
   *
   * @memberOf WindowForms
   */
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

  /**
   * Creates the start window
   *
   *
   * @memberOf WindowForms
   */
  startWindow () {
    this.windows.unshift(new this.BrowserWindow({width: 800, height: 600, resizable: false, maximizable: false}))
    // let i = this.windows.length - 1
    let i = 0
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
  WindowForms: WindowForms,
  WindowGraph: WindowGraph
}
