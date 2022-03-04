import { app, BrowserWindow, ipcMain } from "electron";
const electronLocalShortcut = require('electron-localshortcut');


let mainWindow: Electron.BrowserWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        height: 800,
        width: 1200,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    electronLocalShortcut.register(mainWindow, 'F12', () => {
        mainWindow.webContents.openDevTools();
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow();
    }
});


ipcMain.on('re-render', () => {
    mainWindow.loadFile('index.html');
})


