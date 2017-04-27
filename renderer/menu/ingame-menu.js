'use strict'

const {ipcRenderer} = require('electron')
const $ = require('jquery')

window.onload = function () {
  ipcRenderer.on('load', (event, data) => {
    $('#resumeBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('resume-game', data.index.childIndex)
    })

    $('#optionsBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('options', data.index.childIndex)
    })

    $('#quitBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('quit-game')
    })

    $('#quitToMainBtn').on('click', (event) => {
      event.preventDefault()
      ipcRenderer.send('quit-to-main-window', data.index)
    })
  })
}
