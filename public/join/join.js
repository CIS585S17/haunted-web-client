'use stict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, index) => {
  $('#joinGameBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('join', {
      ipAddress: $('#ipAddress'),
      port: $('#port'),
      index: index
    })
  })
})