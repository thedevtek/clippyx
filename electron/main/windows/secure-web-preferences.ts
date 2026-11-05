import type { WebPreferences } from 'electron';

export const createSecureWebPreferences = (preloadPath: string): WebPreferences => ({
  preload: preloadPath,
  nodeIntegration: false,
  contextIsolation: true,
  sandbox: true,
  webSecurity: true,
  allowRunningInsecureContent: false,
});
