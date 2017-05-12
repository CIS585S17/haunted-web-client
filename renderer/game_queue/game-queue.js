'use strict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, data) => {
  // console.log(data)
  // let chars = data.options.characters
  loadCharacters(data.options.characters)

  ipcRenderer.on('selected-characters', (event, characters) => {
    console.log(characters)
    loadCharacters(characters)
  })
})

function loadCharacters (characters) {
  let character0 = $('#character_0')
  let character1 = $('#character_1')
  character0.empty()
  character1.empty()

  for (let i = 0; i < characters.length; i++) {
    if (i === 0) {
      character0.append(`<li class="list-group-item">Character ID: ${characters[i].id}</li>`)
      character0.append(`<li class="list-group-item">Power Stats: ${characters[i].powerStats}</li>`)
      character0.append(`<li class="list-group-item">Speed Stats: ${characters[i].speedStats}</li>`)
      character0.append(`<li class="list-group-item">Sanity Stats: ${characters[i].sanityStats}</li>`)
      character0.append(`<li class="list-group-item"><button class="btn btn-primary" id="select_${i}">Select Character ${characters[i].id}</button></li>`)
      // if (characters[i].available) {
        // character0.append(`<li class="list-group-item"><button class="btn btn-primary" id="select_${i}">Select Character ${i}</button></li>`)
      // } else {
        // character0.append(`<li class="list-group-item"><button class="btn btn-primary" id="unSelect_${i}">Unselect Character ${i}</button></li>`)
      // }
    }
    if (i === 1) {
      character1.append(`<li class="list-group-item">Character ID: ${characters[i].id}</li>`)
      character1.append(`<li class="list-group-item">Power Stats: ${characters[i].powerStats}</li>`)
      character1.append(`<li class="list-group-item">Speed Stats: ${characters[i].speedStats}</li>`)
      character1.append(`<li class="list-group-item">Sanity Stats: ${characters[i].sanityStats}</li>`)
      character1.append(`<li class="list-group-item"><button class="btn btn-primary" id="select_${i}">Select Character ${characters[i].id}</button></li>`)
      // if (characters[i].available) {
      //   character1.append(`<li class="list-group-item"><button class="btn btn-primary" id="select_${i}">Select Character ${i}</button></li>`)
      // } else {
      //   character1.append(`<li class="list-group-item"><button class="btn btn-primary" id="unSelect_${i}">Unselect Character ${i}</button></li>`)
      // }
    }
  }
  for (let i = 0; i < characters.length; i++) {
    if (characters[i].available) {
      $(`#select_${i}`).on('click', () => {
        // $('#view').prop('disabled', true)
        ipcRenderer.send('select-character', characters[i].id)
      })
    }
  }
}
