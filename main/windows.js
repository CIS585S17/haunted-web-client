'use strict'

/**
 * 
 */
class GameWindow {
  /**
   * 
   * @param {*} id 
   * @param {*} debug 
   * @param {*} dirname 
   * @param {*} file 
   * @param {*} modal 
   * @param {*} options 
   * @param {*} window 
   */
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

  /**
   * 
   */
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

  /**
   * 
   */
  show () {
    this.window.once('ready-to-show', () => {
      this.window.show()
    })
  }
}

/**
 * 
 */
class WindowGraph {
  /**
   * Creates an instance of WindowForms.
   * @param {object} BrowserWindow
   * @param {boolean} debug
   * @param {string} dirname Path
   * @param {array} windows Stores open windows
   *
   * @memberOf WindowGraph
   */
  constructor (BrowserWindow, debug, dirname) {
    this.BrowserWindow = BrowserWindow
    this.debug = debug
    this.dirname = dirname
    this.windows = []
  }

  /**
   * 
   * @param {*} parentWin 
   * @param {*} options 
   *
   * @memberOf WindowGraph
   */
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

  /**
   * 
   * @param {*} parentWin 
   * @param {*} options 
   *
   * @memberOf WindowGraph
   */
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
   * @memberOf WindowGraph
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

  /**
   * 
   * @param {*} parentWin 
   * @param {*} options 
   *
   * @memberOf WindowGraph
   */
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
   * @memberOf WindowGraph
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
   * 
   * @param {*} options 
   *
   * @memberOf WindowGraph
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

  /**
   * 
   * @param {*} options 
   *
   * @memberOf WindowGraph
   */
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

module.exports = {
  WindowGraph: WindowGraph
}
