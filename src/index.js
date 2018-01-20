const electron = require('electron').remote
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const notifyButton =  documentgetElementById('notifyBtn')

notifyButton.addEventListener('click',function(event)
{
  const modalpath = path.join('file://', __dirname, 'update.html')
  let window = new BrowserWindow({frame: false, alwaysOnTop: true, width: 400, height: 200})
  window.on('close', function(){  window=null  })
  window.loadURL(modalpath)
  window.show()
}
)