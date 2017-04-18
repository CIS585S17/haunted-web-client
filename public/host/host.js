'use stict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, data) => {
  $('#hostGameBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('host', {
      name: $('#name').val(),
      index: data.index
    })
    // ipcRenderer.send('host', {
    //   ipAddress: $('#ipAddress'),
    //   port: $('#port'),
    //   index: index
    // })
  })
})
