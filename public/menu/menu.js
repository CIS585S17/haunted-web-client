'use strict'

const {ipcRenderer} = require('electron')
const $ = require('jquery')

window.onload = function () {
  ipcRenderer.on('load', (event, index) => {
    $('#hostGameBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('host-game', index)
    })

    $('#joinGameBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('join-game', index)
    })

    $('#optionsBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('options', index)
    })

    $('#quitBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('quit-game', index)
    })
  })
}
