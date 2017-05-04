'use strict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, data) => {
  console.log(data)
  let chars = data.options.characters
  for (let i = 0; i < chars.length; i++) {
    if (i === 0) {
      for (let item in chars[i]) {
        $('#character_0').append(`<li class="list-group-item">${item.toString()}</li>`)
      }
    }
    if (i === 1) {
      for (let item in chars[i]) {
        $('#character_0').append(`<li class="list-group-item">${item.toString()}</li>`)
      }
    }
  }
})
