import { app, BrowserWindow, ipcMain, session } from 'electron';
import { buildCsp } from '../shared/csp';
import { registerIpc } from './ipc/register-ipc';
import { createMainWindow } from './windows/main-window';

const isDev = !app.isPackaged;

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  let mainWindow: BrowserWindow | undefined;

  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.on('window-all-closed', () => app.quit());

  void app.whenReady().then(() => {
    if (isDev) {
      session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': [buildCsp({ isDev: true })],
          },
        });
      });
    }

    registerIpc(ipcMain, { 'app:getVersion': () => app.getVersion() });
    mainWindow = createMainWindow();
  });
}
