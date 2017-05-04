'use strict'
const {ipcRenderer} = require('electron')

ipcRenderer.on('load', (event, options) => {
  console.log(options)
})
