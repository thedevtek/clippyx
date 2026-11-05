import { contextBridge, ipcRenderer } from 'electron';
import { createApi } from './api';

contextBridge.exposeInMainWorld('clippyx', createApi(ipcRenderer));
