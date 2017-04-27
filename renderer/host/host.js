'use stict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, options) => {
  let name = $('#name')
  let nameError = $('#nameError')

  function handleError (message) {
    nameError.text(message)
    nameError.show()
  }

  name.on('input', (event) => {
    nameError.hide()
  })

  $('#hostGameBtn').on('click', (event) => {
    event.preventDefault()
    if (!name.val()) {
      handleError('Game name cannot be left blank! Please try again.')
    }
    ipcRenderer.send('host', {
      name: $('#name').val(),
      id: options.id
    })
    ipcRenderer.on('error', (event, error) => {
      handleError(error.message)
    })
    // ipcRenderer.send('host', {
    //   ipAddress: $('#ipAddress'),
    //   port: $('#port'),
    //   index: index
    // })
  })
})
