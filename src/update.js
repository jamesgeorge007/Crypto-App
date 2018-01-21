const electron = require('electron')
const path = require('path')
const remote = electron.remote

const close = document.getElementById('close_btn')

close.addEventListener('click', function()
{
    var window = remote.getCurrentWindow()
    window.close()
})