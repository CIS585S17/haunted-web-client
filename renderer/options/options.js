'use strict'

const {ipcRenderer} = require('electron')
const $ = require('jquery')

window.onload = function(){
  ipcRenderer.on('load', (event, index) => {
    var BrightnessChange = function(){
      bright = (bright/10)+1
      $("index").css({"filter" : "brightness("+bright+")"})
    }
    var bright = $('#brightness').slider()
                                .on('slide', BrightnessChange)
                                .data('slider')
    $('#resumeBtn').on('click', (event) =>{
      event.preventDefault()
      ipcRenderer.send('resume-game', index)
    })
  })
}
