import type { IpcRenderer } from 'electron';
import type { IpcChannel, IpcRequest, IpcResponse } from '../shared/ipc-contract';

export const createApi = (ipcRenderer: Pick<IpcRenderer, 'invoke'>) => {
  const invoke = <C extends IpcChannel>(
    channel: C,
    ...args: IpcRequest<C> extends undefined ? [] : [IpcRequest<C>]
  ): Promise<IpcResponse<C>> => ipcRenderer.invoke(channel, ...args) as Promise<IpcResponse<C>>;

  return {
    getVersion: () => invoke('app:getVersion'),
  };
};

export type ClippyxApi = ReturnType<typeof createApi>;
