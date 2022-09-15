import {BrowserWindow, app, ipcMain} from 'electron';
const electronLocalShortcut = require('electron-localshortcut');

let mainWindow: Electron.BrowserWindow;
let splashWindow: Electron.BrowserWindow;

function createWindow(): void {
    splashWindow = new BrowserWindow({
        height: 110,
        width: 400,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        resizable: false
    });
    splashWindow.loadFile('splash-art.html');
    splashWindow.center();

    mainWindow = new BrowserWindow({
        height: 1080,
        width: 1920,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        show: false
    });

    mainWindow.loadFile('index.html');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    electronLocalShortcut.register(mainWindow, 'F5', () => {
        mainWindow.reload();
    });

    electronLocalShortcut.register(mainWindow, 'F10', () => {
        mainWindow.webContents.send('open-debug-layer');
    });

    electronLocalShortcut.register(mainWindow, 'F12', () => {
        mainWindow.webContents.openDevTools();
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('re-render', () => {
    mainWindow.loadFile('index.html');
});

ipcMain.on('game-root-scene-ready', () => {
    splashWindow.close();
    mainWindow.show();
});

