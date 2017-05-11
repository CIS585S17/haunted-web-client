'use strict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, data) => {
  console.log(data)
  let chars = data.options.characters
  for (let i = 0; i < chars.length; i++) {
    if (i === 0) {
      $('#character_0').append(`<li class="list-group-item">Character ID: ${chars[i].id}</li>`)
      $('#character_0').append(`<li class="list-group-item">Power Stats: ${chars[i].powerStats}</li>`)
      $('#character_0').append(`<li class="list-group-item">Speed Stats: ${chars[i].speedStats}</li>`)
      $('#character_0').append(`<li class="list-group-item">Sanity Stats: ${chars[i].sanityStats}</li>`)
      $('#character_0').append(`<li class="list-group-item"></li>`)
    }
    if (i === 1) {
      $('#character_1').append(`<li class="list-group-item">Character ID: ${chars[i].id}</li>`)
      $('#character_1').append(`<li class="list-group-item">Power Stats: ${chars[i].powerStats}</li>`)
      $('#character_1').append(`<li class="list-group-item">Speed Stats: ${chars[i].speedStats}</li>`)
      $('#character_1').append(`<li class="list-group-item">Sanity Stats: ${chars[i].sanityStats}</li>`)
      $('#character_1').append(`<li class="list-group-item"></li>`)
    }
  }
})
