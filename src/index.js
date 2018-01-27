const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyButton = document.getElementById('notifyBtn')
const price = document.querySelector('h2')
const targetPrice = document.getElementById('set')
var targetPriceValue

function getBTCPrice() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
        .then(res => {

            const cryptos = res.data.BTC.USD
            price.innerHTML = '$' + cryptos.toLocaleString('en')

        })
}

getBTCPrice();
setInterval(getBTCPrice, 30000);

notifyButton.addEventListener('click', function(event) {
    const modalpath = path.join('file://', __dirname, 'update.html')
    let window = new BrowserWindow({ resizable: false, frame: false, alwaysOnTop: true, transparent: true, width: 400, height: 200 })
    window.on('close', function() { window = null })
    window.loadURL(modalpath)
    window.show()
})

ipc.on('targetPriceValue', function(event, arg) {
    targetPriceValue = Number(arg)
    targetPrice.innerHTML = '$' + targetPriceValue.toLocaleString('en')
})