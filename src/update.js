const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer




const close = document.getElementById('close_btn')

close.addEventListener('click', function() {
    var window = remote.getCurrentWindow()
    window.close()
})

const updateBtn = document.getElementById('updateBtn')

const notification = {
    title: 'Alert!!',
    body: 'BTC value just reached a higher value than you specified.'
}

updateBtn.addEventListener('click', function() {
    ipc.send('update-notify-value', document.getElementById('price_value').value)

    //const notification = new window.Notification(notification.title, notification)
    // notification.show()

    var win = remote.getCurrentWindow()
    win.close()
})