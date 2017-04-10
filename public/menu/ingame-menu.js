'use strict'

const {ipcRenderer} = require('electron')
const $ = require('jquery')

window.onload = function () {
  ipcRenderer.on('load', (event, index) => {
    $('#resumeBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('resume-game', index)
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
