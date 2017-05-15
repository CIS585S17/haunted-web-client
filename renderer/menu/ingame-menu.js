'use strict'

const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, data) => {
  console.log(data)
  $('#resumeBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('resume-game', data.id)
  })

  $('#optionsBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('options', data.id)
  })

  $('#quitBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('quit-game')
  })

  $('#quitToMainBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('quit-to-main-window', {
      parentId: data.options.parentId,
      childId: data.id
    })
  })
})
