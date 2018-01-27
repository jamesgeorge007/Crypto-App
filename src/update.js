const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer


const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function() {
    ipc.send('update-notify-value', document.getElementById('value').value)

    var window = remote.getCurrentWindow()
    window.close()
})

const close = document.getElementById('close_btn')

close.addEventListener('click', function() {
    var window = remote.getCurrentWindow()
    window.close()
})