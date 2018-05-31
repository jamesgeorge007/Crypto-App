const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

 createWindow = () => {
    // Create the browser window.
    win = new BrowserWindow({ resizable: false, width: 800, height: 660 })

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    //win.webContents.openDevTools()

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
    })

    var menu = Menu.buildFromTemplate([{
        label: 'Menu',
        submenu: [
            { label: 'Developer',
              click(){
                shell.openExternal('https://jamesgeorge007.github.io')
              }
              },
            {
                label: 'CoinMarkerMap',
                click(){
                    shell.openExternal('https://coinmarketcap.com')
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click(){
                    app.quit()
                }
            }
        ]


    }])

    Menu.setApplicationMenu(menu);
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow()
    }
})

ipc.on('update-notify-value', (event, arg) => {
    win.webContents.send('targetPriceValue', arg)
})
