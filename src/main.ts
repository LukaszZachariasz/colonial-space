import {BrowserWindow, app, ipcMain} from 'electron';
const electronLocalShortcut = require('electron-localshortcut');

export class Main {
    public mainWindow: Electron.BrowserWindow;
    public splashWindow: Electron.BrowserWindow;

    constructor() {
        app.on('ready', () => {
            this.createSplashWindow();
            this.createMainWindow();
        });

        app.on('window-all-closed', () => {
            if (process.platform !== 'darwin') {
                app.quit();
            }
        });

        app.on('activate', () => {
            if (this.mainWindow === null) {
                this.createSplashWindow();
                this.createMainWindow();
            }
        });

        ipcMain.on('re-render', () => {
            this.mainWindow.loadFile('index.html');
        });

        ipcMain.on('game-root-scene-ready', () => {
            this.splashWindow.close();
            this.mainWindow.show();
        });
    }

    private createMainWindow(): void {
        this.mainWindow = new BrowserWindow({
            height: 1080,
            width: 1920,
            autoHideMenuBar: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            },
            show: false
        });
        this.mainWindow.loadFile('index.html');

        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });

        this.registerMainWindowEvents();
    }

    private registerMainWindowEvents(): void {
        electronLocalShortcut.register(this.mainWindow, 'F5', () => {
            this.mainWindow.reload();
        });

        electronLocalShortcut.register(this.mainWindow, 'F10', () => {
            this.mainWindow.webContents.send('open-debug-layer');
        });

        electronLocalShortcut.register(this.mainWindow, 'F12', () => {
            this.mainWindow.webContents.openDevTools();
        });
    }

    private createSplashWindow(): void {
        this.splashWindow = new BrowserWindow({
            height: 110,
            width: 400,
            alwaysOnTop: true,
            transparent: true,
            frame: false,
            resizable: false
        });
        this.splashWindow.loadFile('splash-art.html');
        this.splashWindow.center();
    }
}

const main = new Main();
export default main;
