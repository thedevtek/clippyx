import type { ClippyxApi } from '../../electron/preload/api';

declare global {
  interface Window {
    clippyx: ClippyxApi;
  }
}
