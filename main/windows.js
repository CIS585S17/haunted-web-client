'use strict'

/**
 * A class to create windows for the game
 *
 * @class GameWindow
 */
class GameWindow {
  /**
   * Creates an instance of GameWindow
   * @param {integer} id Integer that identifies which window it is in array
   * @param {boolean} debug Show or hide dev tools
   * @param {string} dirname The path of the directory of the parent
   * @param {string} file The path of the html file from the renderer directory
   * @param {boolean} modal Identifies the window as a modal if true
   * @param {object} options Any additional properties to send renderer
   * @param {BrowserWindow} window The window to be loaded and displayed
   *
   * @memberOf GameWindow
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
   * Load the url/path of the html file and display the window
   *
   * @memeberOf GameWindow
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
   * Show the modal window
   *
   * @memberOf GameWindow
   */
  show () {
    this.window.once('ready-to-show', () => {
      this.window.show()
    })
  }
}

/**
 * A class to manage multiple GameWindows
 *
 * @class WindowGraph
 */
class WindowGraph {
  /**
   * Creates an instance of WindowGraph.
   * @param {BrowserWindow} BrowserWindow
   * @param {boolean} debug Show or hide dev tools
   * @param {string} dirname The path of the directory of the parent
   * @param {array} windows Stores GameWindow instances
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
   * Cereate the game window allowing the player to play the game.
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {object} options Any additional properties to send renderer
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
   * Creates a game queue window with message telling player to wait
   * for additional players to join the game.
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {GameWindow} parentWin The parent of this modal window
   * @param {object} options Any additional properties to send renderer
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
      new this.BrowserWindow({width: 1800, height: 1000, resizable: false, maximizable: false, parent: parentWin.window, modal: true, show: false})
    ))
    let win = this.windows[this.windows.length - 1]
    win.window.on('closed', () => {
      this.windows.splice(this.windows.indexOf(win), 1)
    })
    return win
  }

  /**
   * Create host game modal allowing player to create a new game with the server.
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {GameWindow} parentWin The parent of this modal window
   * @param {object} options Any additional properties to send renderer
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
   * Creates in game menu modal window.
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {GameWindow} parentWin The parent of this modal window
   * @param {object} options Any additional properties to send renderer
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
   * Creates a window to display the list of available games returned from the server.
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {GameWindow} parentWin The parent of this modal window
   * @param {object} options Any additional properties to send renderer
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
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {GameWindow} parentWin The parent of this modal window
   * @param {object} options Any additional properties to send renderer
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

    // this.windows.push(new this.BrowserWindow({width: 400, height: 450, resizable: true, maximizable: false, parent: this.windows[index], modal: true, show: false}))
    // let i = this.windows.length - 1
    // let optionsWin = this.windows[i]
    // optionsWin.loadURL(`file://${this.dirname}/public/options/options.html`)
    // optionsWin.once('ready-to-show', () => {
    //   optionsWin.show()
    // })
    // optionsWin.webContents.on('did-finish-load', () => {
    //   optionsWin.webContents.send('load', i)
    // })
    // if (this.debug) {
    //   optionsWin.webContents.openDevTools()
    // }

    // optionsWin.on('closed', () => {
    //   this.windows.splice(i, 1)

    // })
  }

  /**
   * Creates the start main menu window.
   * Handle close Event for the window when called, dereference the window
   * and remove it from the windows array.
   * @param {object} options Any additional properties to send renderer
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
