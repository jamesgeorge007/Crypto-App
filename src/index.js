const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const notifyButton =  document.getElementById('notifyBtn')

notifyButton.addEventListener('click',function(event)
{
  const modalpath = path.join('file://', __dirname, 'update.html')
  let window = new BrowserWindow({ resizable: false, frame: false, alwaysOnTop: true, tranparent: true, width: 400, height: 200})
  window.on('close', function(){  window=null  })
  window.loadURL(modalpath)
  window.show()
}
)