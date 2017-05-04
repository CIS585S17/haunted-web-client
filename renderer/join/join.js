'use stict'
const {ipcRenderer} = require('electron')
const $ = require('jquery')

ipcRenderer.on('load', (event, data) => {
  // $('#joinGameBtn').on('click', (event) => {
  //   event.preventDefault()
  //   ipcRenderer.send('join', {
  //     ipAddress: $('#ipAddress'),
  //     port: $('#port'),
  //     index: index
  //   })
  // })

  function loadTable (games) {
    console.log(games)
    let table
    $('#tableBody').empty()
    for (let i = 0; i < games.length; i++) {
      table += `<tr>
      <td>${games[i].id}</td>
      <td>${games[i].name}</td>
      <td><a href="#" id="join_${i}">join<a/></td></tr>`
    }
    $('#tableBody').append(table)
    for (let i = 0; i < games.length; i++) {
      $(`#join_${i}`).on('click', () => {
        ipcRenderer.send('join', {game: games[i], id: data.id})
      })
    }
  }
  console.log(data)
  loadTable(data.options.games)

  // ipcRenderer.on('update-join-table', (event, games) => {
  //   loadTable(games)
  // })
})
