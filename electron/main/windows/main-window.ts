import { join } from 'node:path';
import { BrowserWindow } from 'electron';
import { isAllowedNavigation } from './navigation-policy';
import { createSecureWebPreferences } from './secure-web-preferences';

export const createMainWindow = (): BrowserWindow => {
  const devOrigin = process.env['ELECTRON_RENDERER_URL'];
  const window = new BrowserWindow({
    width: 900,
    height: 640,
    show: false,
    title: 'Clippyx',
    webPreferences: createSecureWebPreferences(join(__dirname, '../preload/index.cjs')),
  });

  window.once('ready-to-show', () => window.show());
  window.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  window.webContents.on('will-navigate', (event, url) => {
    if (!isAllowedNavigation(url, devOrigin)) event.preventDefault();
  });

  if (devOrigin) {
    void window.loadURL(devOrigin);
  } else {
    void window.loadFile(join(__dirname, '../renderer/index.html'));
  }
  return window;
};
