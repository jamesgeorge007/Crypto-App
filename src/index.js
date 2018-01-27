const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyButton = document.getElementById('notifyBtn')
const price = document.querySelector('h2')
const targetPrice = document.getElementById('set')
var targetPriceValue

const notification = {
    title: 'Alert!!',
    body: 'BTC value just reached a higher value than you specified.'
}

function getBTCPrice() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {

            const cryptos = res.data.BTC.USD
            price.innerHTML = '$' + cryptos.toLocaleString('en')

            if (targetPriceValue < res.data.BTC.USD) {
                const Notification = new window.Notification(notification.title, notification)
            }
        })
}

getBTCPrice();
setInterval(getBTCPrice, 1000);

notifyButton.addEventListener('click', function(event) {
    const modalpath = path.join('file://', __dirname, 'update.html')
    let window = new BrowserWindow({ resizable: false, frame: false, alwaysOnTop: true, transparent: true, width: 400, height: 350 })
    window.on('close', function() { window = null })
    window.loadURL(modalpath)
    window.show()
})

ipc.on('targetPriceValue', function(event, arg) {
    targetPriceValue = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceValue.toLocaleString('en')
})