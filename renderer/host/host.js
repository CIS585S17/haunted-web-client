'use stict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, options) => {
  $('#hostGameBtn').on('click', (event) => {
    event.preventDefault()
    ipcRenderer.send('host', {
      name: $('#name').val(),
      id: options.id
    })
    // ipcRenderer.send('host', {
    //   ipAddress: $('#ipAddress'),
    //   port: $('#port'),
    //   index: index
    // })
  })
})
