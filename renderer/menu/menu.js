'use strict'

const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, options) => {
  $('#hostGameBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('host-game', options.id)
  })

  $('#joinGameBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('join-game', options.id)
  })

  $('#optionsBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('options', options.id)
  })

  $('#quitBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('quit-game', options.id)
  })
})
